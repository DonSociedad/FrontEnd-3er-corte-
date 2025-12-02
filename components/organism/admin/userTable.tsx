"use client";

import useAdminUsers from "@/hooks/admin/useAdminUsers";

import Image from "next/image";

export default function UserTable() {
    const { users, isLoading, error, filter, setFilter } = useAdminUsers();

    if (isLoading) return <div className="p-10 text-center text-gray-500">Cargando usuarios...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="bg-[#9e7d74ff]/20 rounded-2xl shadow-lg p-6 border-2 border-[#9e7d74ff]">
            {/* --- Header con Buscador --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Usuarios <span className="text-sm font-normal text-gray-700">({users.length})</span>
                </h2>
                
                <div className="relative w-full md:w-auto">
                    <input 
                        type="text-gray-900" 
                        placeholder="Buscar nombre, apellido..." 
                        className="pl-4 pr-10 py-2 w-full md:w-64 border-2 border-[#9e7d74ff] rounded-xl focus:outline-none focus:border-[#9e7d74ff]/30 transition-colors"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {filter && (
                        <button 
                            onClick={() => setFilter('')}
                            className="absolute right-3 top-2.5 text-gray-200 hover:text-gray-200 font-bold"
                        >✕</button>
                    )}
                </div>
            </div>

            {/* --- Tabla --- */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-gray-200 text-gray-500 text-sm uppercase tracking-wide">
                            <th className="py-3 px-4">Usuario</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4 text-center">Rol</th>
                            <th className="py-3 px-4 text-center">Monedas</th>
                            <th className="py-3 px-4 text-center">Lecciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-medium">
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 capitalize">
                                            {user.name} {user.lastName}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono md:hidden">
                                            {user.id.slice(-4)}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase ${
                                        user.role === 'admin' ? 'bg-[#6f8d48ff] text-white' : 'bg-[#c9ae98ff] text-gray-600'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className="text-orange-400 font-bold flex items-center justify-center gap-1">
                                        <Image
                                            src="/images/icons/moneda.png"
                                            alt="Monedas"
                                            width={40}
                                            height={40}
                                        /> {user.coins}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`inline-block min-w-[30px] py-1 px-2 rounded-full text-sm font-bold ${
                                        (user.completedLessons || 0) > 0 
                                            ? 'bg-[#c9ae98ff] text-white-700' 
                                            : 'bg-[#d89595ff] text-white-400'
                                    }`}>
                                        {user.completedLessons || 0}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {users.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg">No se encontraron resultados para &quot;{filter}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    );
}