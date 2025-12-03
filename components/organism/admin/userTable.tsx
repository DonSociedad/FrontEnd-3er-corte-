"use client";

import useAdminUsers from "@/hooks/admin/useAdminUsers";
import Image from "next/image";
import { useState } from "react";
import { IUserProfile } from "@/interfaces/users/user";
import { useNotification } from "@/contexts/notificationContext";

export default function UserTable() {
    const { users, isLoading, error, filter, setFilter, updateUser, isUpdating } = useAdminUsers();
    const { showNotification } = useNotification();
    
    const [editingUser, setEditingUser] = useState<IUserProfile | null>(null);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingUser) return;

        const formData = new FormData(e.currentTarget);
        
        // Obtenemos el valor del checkbox (si está marcado devuelve "on", si no null)
        const isPremiumChecked = formData.get("isPremium") === "on";

        const updates = {
            name: formData.get("name") as string,
            lastName: formData.get("lastName") as string,
            coins: Number(formData.get("coins")),
            isPremium: isPremiumChecked // Enviamos el booleano
        };

        const result = await updateUser(editingUser.id, updates);

        if (result.success) {
            showNotification("Usuario actualizado correctamente", "success");
            setEditingUser(null);
        } else {
            showNotification("Hubo un error al actualizar", "error");
        }
    };

    if (isLoading) return <div className="p-10 text-center text-gray-500 animate-pulse">Cargando usuarios...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold bg-red-50 rounded-xl">Error: {error}</div>;

    return (
        // Contenedor principal con el color tierra suave de tu diseño
        <div className="bg-[#e8e1de] rounded-2xl shadow-sm p-6 border border-[#d6c6bf]">
            
            {/* --- Header con Buscador --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                        Usuarios <span className="text-sm font-normal text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">({users.length})</span>
                    </h2>
                </div>
                
                <div className="relative w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Buscar nombre, apellido..." 
                        className="pl-4 pr-10 py-2.5 w-full md:w-72 border border-[#d6c6bf] rounded-xl focus:outline-none focus:border-[#9e7d74] focus:ring-2 focus:ring-[#9e7d74]/20 bg-white transition-all text-sm text-gray-600 placeholder-gray-400"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {filter && (
                        <button 
                            onClick={() => setFilter('')}
                            className="absolute right-3 top-3 text-gray-400 hover:text-[#9e7d74] transition-colors"
                        >✕</button>
                    )}
                </div>
            </div>

            {/* --- Tabla --- */}
            <div className="overflow-x-auto rounded-xl bg-white border border-[#eaeaea]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider font-bold">
                            <th className="py-4 px-6">Usuario</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6 text-center">Rol</th>
                            <th className="py-4 px-6 text-center">Membresía</th> 
                            <th className="py-4 px-6 text-center">Monedas</th>
                            <th className="py-4 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-medium text-sm">
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-50 hover:bg-[#faf8f7] transition-colors group">
                                <td className="py-5 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-800 capitalize">
                                            {user.name} {user.lastName}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-5 px-6 text-gray-500 text-xs">
                                    {user.email}
                                </td>
                                <td className="py-5 px-6 text-center">
                                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                                        user.role === 'admin' 
                                        ? 'bg-[#d1e0c4] text-[#4f6b38]' // Verde suave para admin
                                        : 'bg-gray-100 text-gray-500'   // Gris para estudiante
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-5 px-6 text-center">
                                    {user.isPremium ? (
                                        <span className="inline-flex items-center gap-1 bg-[#fff6d6] text-[#b88c00] text-[10px] font-bold px-3 py-1 rounded-full border border-[#ffeeb0]">
                                            <span>👑</span> Premium
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold text-gray-400">
                                            Gratis
                                        </span>
                                    )}
                                </td>
                                <td className="py-5 px-6 text-center">
                                    <span className="inline-flex items-center justify-center gap-1.5 bg-[#fff4e6] text-[#d97706] font-bold px-3 py-1 rounded-lg text-xs">
                                        <Image src="/images/icons/moneda.png" alt="Monedas" width={14} height={14} /> 
                                        {user.coins}
                                    </span>
                                </td>
                                <td className="py-5 px-6 text-center">
                                    <button 
                                        onClick={() => setEditingUser(user)}
                                        className="text-gray-300 hover:text-[#9e7d74] hover:bg-[#9e7d74]/10 p-2 rounded-lg transition-all"
                                        title="Editar Usuario"
                                    >
                                        {/* Icono de editar (Lápiz en caja) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {users.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg">No se encontraron resultados</p>
                    </div>
                )}
            </div>

            {/* --- MODAL DE EDICIÓN CON ESTÉTICA DE LA CAPTURA --- */}
            {editingUser && (
                <div className="fixed inset-0 bg-[#5c4b45]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                        
                        {/* Header del Modal */}
                        <div className="bg-[#9e7d74] p-5 flex justify-between items-center text-white">
                            <div>
                                <h3 className="font-bold text-xl">Editar Usuario</h3>
                                <p className="text-[#eaddd9] text-xs mt-0.5">ID: {editingUser.id.slice(-6)}</p>
                            </div>
                            <button onClick={() => setEditingUser(null)} className="hover:bg-white/20 rounded-full p-1.5 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Nombre</label>
                                    <input 
                                        name="name" 
                                        defaultValue={editingUser.name} 
                                        className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-[#9e7d74] text-sm font-medium text-gray-700 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Apellido</label>
                                    <input 
                                        name="lastName" 
                                        defaultValue={editingUser.lastName} 
                                        className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-[#9e7d74] text-sm font-medium text-gray-700 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* --- SECCIÓN DE ESTATUS (PREMIUM & ROL) --- */}
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {/* Rol (Disabled) */}
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Rol Actual</label>
                                    <div className="bg-white border border-gray-200 rounded-lg p-2 text-xs font-bold text-gray-500 flex items-center gap-2">
                                        {editingUser.role === 'admin' ? '🎓 Administrador' : '🎒 Estudiante'}
                                    </div>
                                </div>

                                {/* Premium Toggle */}
                                <div>
                                    <label className="block text-[10px] font-bold text-[#9e7d74] uppercase mb-1.5 tracking-wider">Membresía</label>
                                    <label className="relative inline-flex items-center cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            name="isPremium" 
                                            defaultChecked={editingUser.isPremium} 
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d9ae06]"></div>
                                        <span className="ms-2 text-xs font-medium text-gray-600 group-hover:text-[#d9ae06] transition-colors">
                                            ¿Es Premium?
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Monedas */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Monedas</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        name="coins" 
                                        defaultValue={editingUser.coins} 
                                        className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 pl-10 outline-none focus:border-[#9e7d74] text-sm font-medium text-gray-700"
                                        min="0"
                                    />
                                    <div className="absolute left-3 top-2.5">
                                        <Image src="/images/icons/moneda.png" alt="coin" width={16} height={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingUser(null)}
                                    className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors text-sm"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isUpdating}
                                    className="flex-1 py-3 bg-[#9e7d74] text-white font-bold rounded-xl hover:bg-[#85665d] shadow-lg shadow-[#9e7d74]/30 active:scale-95 transition-all text-sm disabled:opacity-70 disabled:scale-100"
                                >
                                    {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}