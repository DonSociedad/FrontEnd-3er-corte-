"use client";

import useCreateLesson from "@/hooks/admin/useCreateLesson";
import Link from "next/link";

export default function CreateLessonPage() {
  const { 
    formData, 
    existingLessons, 
    isLoading,
    updateField, 
    addPrerequisite,      
    removePrerequisite,   
    addBlock, 
    removeBlock,
    updateBlockPayload,
    updateOptionText,
    addOption,
    removeOption,         // Función nueva
    submit 
  } = useCreateLesson();

  return (
    <div className="p-8 md:p-12 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Crear Lección</h1>
            <p className="text-gray-500 mt-1">Diseña el contenido educativo interactivo.</p>
        </div>
        <div className="text-right">
             <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Borrador
             </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- COLUMNA IZQUIERDA: CONFIGURACIÓN --- */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    ⚙️ Configuración
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Título</label>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            className="w-full mt-1 border-b-2 border-gray-200 py-2 focus:border-black outline-none font-medium bg-transparent"
                            placeholder="Ej: Inflación Básica"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Orden</label>
                        <input 
                            type="number" 
                            value={formData.order}
                            onChange={(e) => updateField('order', Number(e.target.value))}
                            className="w-full mt-1 border-b-2 border-gray-200 py-2 focus:border-black outline-none font-medium bg-transparent"
                        />
                    </div>

                    {/* --- PRERREQUISITOS MEJORADOS --- */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Prerrequisitos</label>
                        
                        {/* Select para agregar */}
                        <select 
                            className="w-full mt-2 border border-gray-200 rounded-xl p-2 text-sm outline-none focus:border-black bg-gray-50 cursor-pointer"
                            onChange={(e) => {
                                addPrerequisite(e.target.value);
                                e.target.value = ""; // Reset select
                            }}
                        >
                            <option value="">+ Agregar requisito...</option>
                            {existingLessons
                                .filter(l => !formData.prerequisites.includes(l.id)) // Filtrar los ya seleccionados
                                .map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.order}. {l.title}
                                </option>
                            ))}
                        </select>

                        {/* Lista visual de tags (Chips) */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {formData.prerequisites.map(preId => {
                                const lesson = existingLessons.find(l => l.id === preId);
                                return (
                                    <div key={preId} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-xs animate-in fade-in zoom-in duration-200">
                                        <span className="truncate max-w-[150px]">{lesson?.title || "Cargando..."}</span>
                                        <button 
                                            onClick={() => removePrerequisite(preId)}
                                            className="hover:text-red-400 font-bold px-1"
                                        >✕</button>
                                    </div>
                                )
                            })}
                            {formData.prerequisites.length === 0 && (
                                <p className="text-xs text-gray-400 italic">Sin requisitos previos.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- COLUMNA DERECHA: CONTENIDO --- */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                📚 Bloques de Contenido
            </h2>
            
            {formData.contentBlocks.map((block, bIndex) => (
                <div key={bIndex} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 relative group transition-all hover:shadow-lg">
                    
                    {/* Header del bloque */}
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                            Multiple Choice
                        </span>
                        {formData.contentBlocks.length > 1 && (
                            <button 
                                onClick={() => removeBlock(bIndex)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                                title="Eliminar pregunta"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        )}
                    </div>

                    <div className="space-y-5">
                        {/* Prompt */}
                        <div>
                            <input 
                                type="text" 
                                value={block.payload.prompt}
                                onChange={(e) => updateBlockPayload(bIndex, 'prompt', e.target.value)}
                                className="w-full text-lg font-bold placeholder-gray-300 border-none outline-none focus:ring-0 bg-transparent"
                                placeholder="Escribe tu pregunta aquí..."
                            />
                            <div className="h-0.5 w-full bg-gray-100 mt-1"></div>
                        </div>

                        {/* Opciones Mejoradas */}
                        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Opciones de respuesta</p>
                            
                            {block.payload.options.map((opt, oIndex) => (
                                <div key={opt.id} className="flex items-center gap-3 group/option">
                                    {/* Radio Button Correcto */}
                                    <div className="relative">
                                        <input 
                                            type="radio"
                                            name={`correct-${bIndex}`}
                                            checked={block.payload.correctOptionId === opt.id}
                                            onChange={() => updateBlockPayload(bIndex, 'correctOptionId', opt.id)}
                                            className="peer sr-only"
                                            id={`radio-${bIndex}-${opt.id}`}
                                        />
                                        <label 
                                            htmlFor={`radio-${bIndex}-${opt.id}`}
                                            className={`flex items-center justify-center w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                                                block.payload.correctOptionId === opt.id 
                                                ? 'border-green-500 bg-green-500 text-white' 
                                                : 'border-gray-300 hover:border-gray-400 text-transparent'
                                            }`}
                                        >
                                            ✓
                                        </label>
                                    </div>

                                    {/* Input de texto */}
                                    <div className="flex-1 relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-400">{opt.id.toUpperCase()}</span>
                                        <input 
                                            type="text"
                                            value={opt.text}
                                            onChange={(e) => updateOptionText(bIndex, oIndex, e.target.value)}
                                            className={`w-full pl-8 pr-3 py-2 rounded-lg border text-sm outline-none transition-all ${
                                                block.payload.correctOptionId === opt.id 
                                                ? 'border-green-500 bg-white shadow-sm' 
                                                : 'border-transparent bg-white focus:border-gray-300 focus:bg-white'
                                            }`}
                                            placeholder={`Opción ${opt.id}`}
                                        />
                                    </div>

                                    {/* Botón Eliminar Opción */}
                                    <button 
                                        onClick={() => removeOption(bIndex, oIndex)}
                                        disabled={block.payload.options.length <= 2}
                                        className={`p-2 rounded-lg text-gray-300 transition-colors ${
                                            block.payload.options.length <= 2 
                                            ? 'opacity-0 cursor-default' 
                                            : 'hover:bg-red-50 hover:text-red-500 opacity-0 group-hover/option:opacity-100'
                                        }`}
                                        title="Eliminar opción"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            <button 
                                onClick={() => addOption(bIndex)}
                                className="flex items-center gap-2 text-sm text-gray-500 font-bold hover:text-black mt-2 px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors w-max"
                            >
                                <span className="bg-gray-200 w-5 h-5 flex items-center justify-center rounded-full text-xs">+</span>
                                Agregar opción
                            </button>
                        </div>

                        {/* Explicación */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Explicación (Feedback)</label>
                            <textarea 
                                value={block.payload.explanation}
                                onChange={(e) => updateBlockPayload(bIndex, 'explanation', e.target.value)}
                                className="w-full mt-1 border-2 border-dashed border-gray-200 rounded-xl p-3 focus:border-blue-300 outline-none text-sm resize-none transition-colors hover:border-gray-300"
                                rows={2}
                                placeholder="Explica por qué la respuesta correcta es la correcta..."
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button 
                onClick={addBlock}
                className="w-full py-6 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold hover:border-black hover:text-black hover:bg-gray-50 transition-all flex flex-col items-center gap-2"
            >
                <span className="text-2xl">+</span>
                Agregar otra pregunta
            </button>
        </div>

      </div>

      {/* --- ACTION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 md:pl-72 z-40 flex justify-between items-center">
            <p className="text-xs text-gray-400 hidden md:block">
                Asegúrate de marcar la respuesta correcta en cada pregunta.
            </p>
            <div className="flex gap-4 ml-auto">
                <Link 
                    href="/admin/lessons" 
                    className="px-6 py-3 font-bold text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl transition-colors"
                >
                    Cancelar
                </Link>
                <button 
                    onClick={submit}
                    disabled={isLoading}
                    className="px-8 py-3 bg-black text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Guardando...
                        </>
                    ) : (
                        <>
                            <span>💾</span> Guardar Lección
                        </>
                    )}
                </button>
            </div>
      </div>
    </div>
  );
}