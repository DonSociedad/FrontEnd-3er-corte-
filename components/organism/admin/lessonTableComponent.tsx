"use client";

import useAdminLessons from "@/hooks/admin/useAdminLessons";
import { useState } from "react";
import { IAdminLesson } from "@/interfaces/lessons/lesson";
import { useNotification } from "@/contexts/notificationContext";

export default function LessonTable() {
    const { 
        lessons, 
        isLoading, 
        error, 
        filter, 
        setFilter, 
        updateLesson, 
        deleteLesson, 
        isUpdating 
    } = useAdminLessons();

    const { showNotification } = useNotification();
    
    // Estado para el Modal de Edición
    const [editingLesson, setEditingLesson] = useState<IAdminLesson | null>(null);

    // Guardar cambios del Modal
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingLesson) return;

        const formData = new FormData(e.currentTarget);
        
        const updates = {
            title: formData.get("title") as string,
            order: Number(formData.get("order")),
            coins: Number(formData.get("coins")), 
        };

        const result = await updateLesson(editingLesson.id, updates);

        if (result.success) {
            showNotification("Lección actualizada correctamente", "success");
            setEditingLesson(null);
        }
    };

    if (isLoading) return <div className="p-10 text-center text-gray-500 animate-pulse">Cargando lecciones...</div>;
    if (error) return <div className="p-10 text-center text-red-500 font-bold bg-red-50 rounded-xl">Error: {error}</div>;

    return (
        // CONTENEDOR PRINCIPAL ESTILO TIERRA 
        <div className="bg-[#e8e1de] rounded-2xl shadow-sm p-6 border border-[#d6c6bf]">
            
            {/* --- Header con Buscador --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
                        Lecciones <span className="text-sm font-normal text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">({lessons.length})</span>
                    </h2>
                </div>
                
                <div className="relative w-full md:w-auto">
                    <input 
                        type="text" 
                        placeholder="Buscar lección..." 
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
                            <th className="py-4 px-6 text-center w-20">Orden</th>
                            <th className="py-4 px-6">Título</th>
                            <th className="py-4 px-6 text-center">Contenido</th>
                            <th className="py-4 px-6 text-center">Req.</th>
                            <th className="py-4 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-medium text-sm">
                        {lessons.map((lesson) => (
                            <tr key={lesson.id} className="border-b border-gray-50 hover:bg-[#faf8f7] transition-colors group">
                                {/* Orden */}
                                <td className="py-5 px-6 text-center">
                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f4ece9] text-[#9e7d74] font-bold text-xs border border-[#e8ded9]">
                                        {lesson.order}
                                    </div>
                                </td>
                                
                                {/* Título */}
                                <td className="py-5 px-6">
                                    <span className="font-bold text-gray-700 text-sm">
                                        {lesson.title}
                                    </span>
                                    <div className="md:hidden text-[10px] text-gray-400 font-mono mt-1">
                                        {lesson.id.slice(-6)}
                                    </div>
                                </td>

                                {/* Bloques */}
                                <td className="py-5 px-6 text-center">
                                    <span className="bg-blue-50 text-blue-600 border border-blue-100 py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                        {lesson.contentBlocksCount} Bloques
                                    </span>
                                </td>

                                {/* Prerrequisitos */}
                                <td className="py-5 px-6 text-center">
                                    {lesson.prerequisites > 0 ? (
                                        <span className="bg-orange-50 text-orange-600 border border-orange-100 py-1 px-3 rounded-full text-[10px] font-bold">
                                            {lesson.prerequisites} Previas
                                        </span>
                                    ) : (
                                        <span className="bg-[#eaf4e6] text-[#5e8a4f] border border-[#dcecd6] py-1 px-3 rounded-full text-[10px] font-bold">
                                            Inicial
                                        </span>
                                    )}
                                </td>

                                {/* Acciones */}
                                <td className="py-5 px-6 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Editar (Metadata) */}
                                        <button 
                                            onClick={() => setEditingLesson(lesson)}
                                            className="text-gray-300 hover:text-[#9e7d74] hover:bg-[#9e7d74]/10 p-2 rounded-lg transition-all"
                                            title="Editar Información"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        
                                        {/* Eliminar */}
                                        <button 
                                            onClick={() => deleteLesson(lesson.id)}
                                            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                            title="Eliminar Lección"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </button>
                                    </div>
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

            {/* --- MODAL DE EDICIÓN ESTILO TIERRA --- */}
            {editingLesson && (
                <div className="fixed inset-0 bg-[#5c4b45]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                        
                        {/* Header del Modal */}
                        <div className="bg-[#9e7d74] p-5 flex justify-between items-center text-white">
                            <div>
                                <h3 className="font-bold text-xl">Editar Lección</h3>
                                <p className="text-[#eaddd9] text-xs mt-0.5">ID: {editingLesson.id.slice(-6)}</p>
                            </div>
                            <button onClick={() => setEditingLesson(null)} className="hover:bg-white/20 rounded-full p-1.5 transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Título</label>
                                <input 
                                    name="title" 
                                    defaultValue={editingLesson.title} 
                                    className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-[#9e7d74] text-sm font-medium text-gray-700 transition-colors"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Orden</label>
                                    <input 
                                        type="number"
                                        name="order" 
                                        defaultValue={editingLesson.order} 
                                        className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-[#9e7d74] text-sm font-medium text-gray-700 transition-colors"
                                        min="0"
                                        required
                                    />
                                </div>
                                <div>
                                    {/* Si tienes la propiedad coins en la lista, si no, elimina este input */}
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Monedas</label>
                                    <input 
                                        type="number"
                                        name="coins" 
                                        // Si tu interfaz IAdminLesson no tiene coins, usa defaultValue={0} o modifica la interfaz
                                        defaultValue={editingLesson.coins || 0}
                                        className="w-full border-2 border-gray-100 rounded-xl px-3 py-2.5 outline-none focus:border-[#9e7d74] text-sm font-medium text-gray-700 transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                                <p className="text-xs text-orange-800 flex gap-2">
                                    <span>⚠️</span>
                                    <span>Para editar el <strong>contenido</strong> (preguntas y respuestas), usa el botón &quot;Editar Contenido&quot; en el creador.</span>
                                </p>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingLesson(null)}
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