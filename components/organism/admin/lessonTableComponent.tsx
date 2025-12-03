"use client";

import useAdminLessons from "@/hooks/admin/useAdminLessons";

export default function LessonTable() {
    const { lessons, isLoading, error, filter, setFilter } = useAdminLessons();

    if (isLoading) return <div className="p-10 text-center text-gray-500 animate-pulse">Cargando lecciones...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold">Error: {error}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
            {/* Header con Buscador */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Lecciones <span className="text-sm font-normal text-gray-500">({lessons.length})</span>
                </h2>
                
                <div className="relative w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Buscar lección..." 
                        className="pl-4 pr-10 py-2 w-full md:w-64 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-400 transition-colors"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {filter && (
                        <button 
                            onClick={() => setFilter('')}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 font-bold"
                        >✕</button>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-gray-200 text-gray-500 text-sm uppercase tracking-wide">
                            <th className="py-3 px-4 text-center w-20">Orden</th>
                            <th className="py-3 px-4">Título</th>
                            <th className="py-3 px-4 text-center">Bloques</th>
                            <th className="py-3 px-4 text-center">Prerrequisitos</th>
                            <th className="py-3 px-4 text-center">ID</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-medium">
                        {lessons.map((lesson) => (
                            <tr key={lesson.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                {/* Orden: Círculo numerado */}
                                <td className="py-4 px-4 text-center">
                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">
                                        {lesson.order}
                                    </div>
                                </td>
                                
                                {/* Título */}
                                <td className="py-4 px-4 font-bold text-gray-800">
                                    {lesson.title}
                                </td>

                                {/* Bloques de Contenido */}
                                <td className="py-4 px-4 text-center">
                                    <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md text-xs font-bold uppercase">
                                        {lesson.contentBlocksCount} Bloques
                                    </span>
                                </td>

                                {/* Prerrequisitos */}
                                <td className="py-4 px-4 text-center">
                                    {lesson.prerequisites > 0 ? (
                                        <span className="text-orange-500 font-bold text-sm">
                                            {lesson.prerequisites} Req.
                                        </span>
                                    ) : (
                                        <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                                            Inicial
                                        </span>
                                    )}
                                </td>

                                {/* ID (oculto en móviles) */}
                                <td className="py-4 px-4 text-center">
                                    <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                        {lesson.id.slice(-6)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {lessons.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg">No se encontraron lecciones.</p>
                    </div>
                )}
            </div>
        </div>
    );
}