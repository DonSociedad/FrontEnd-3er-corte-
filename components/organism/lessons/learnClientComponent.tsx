'use client';

import useLesson from "@/hooks/lessons/useLesson";
import LearnOrganism from "@/components/organism/lessons/learnOrganism";
import { LearnClientProps } from "@/interfaces/lessons/learnClientProps";

import { useRouter } from "next/navigation";


export default function LearnClient({ lessonId }: LearnClientProps) {
    const { 
        lesson, 
        loading, 
        error, 
        currentBlock, 
        submitAnswer, 
        isSubmitting, 
        lastResponse, 
        goToNext,
        lessonStatus, 
        retryLesson,  
        mistakes      
    } = useLesson(lessonId);

    const router = useRouter();

    if (loading) return <div className="p-4 text-slate-500 font-medium animate-pulse">Cargando lección...</div>;
    if (error) return <div className="p-4 text-red-400">Error: {error}</div>;


    if (lessonStatus === 'failed') {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-orange-50 p-6 animate-in fade-in duration-500">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-2 border-orange-100">
                    
                    {/* Icono o Imagen de Error */}
                    <div className="mb-6 flex justify-center">
                        <div className="bg-orange-100 p-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Lección no superada!</h2>
                    <p className="text-gray-600 mb-6">
                        Cometiste <span className="font-bold text-orange-600">{mistakes}</span> {mistakes === 1 ? 'error' : 'errores'}. 
                        Para completar esta lección y avanzar de nivel, debes responder todo correctamente.
                    </p>

                    <div className="flex flex-col gap-4 mt-6">
                        {/* Botón Reiniciar: */}
                        <button 
                            onClick={retryLesson}
                            type="button"
                            className="
                                group relative w-full py-3.5 px-4 rounded-2xl font-bold text-white text-lg
                                bg-gradient-to-r from-[#ff8fa3] to-[#ffaf7a] 
                                hover:from-[#ff7b93] hover:to-[#ff9f6a]
                                shadow-lg shadow-pink-200
                                transform transition-all duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-95
                                flex items-center justify-center gap-2
                            "
                        >
                            {/* Icono animado al hacer hover en el botón */}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2.5} 
                                stroke="currentColor" 
                                className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <span>Intentar de nuevo</span>
                        </button>

                        {/* Botón Volver al Mapa: Estilo sutil pero con texto rosado */}
                        <button 
                            onClick={() => router.push('/map')}
                            type="button"
                            className="
                                w-full py-3.5 px-4 rounded-2xl font-bold 
                                bg-white border-2 border-pink-100 text-pink-400
                                hover:bg-pink-50 hover:text-pink-500 hover:border-pink-200
                                transition-colors duration-200
                            "
                        >
                            Volver al mapa
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // === RENDER NORMAL DE PREGUNTAS ===
    if (!lesson || !currentBlock) return <div className="p-4 text-slate-200">No hay preguntas disponibles.</div>;

    if (currentBlock.type === "multiple_choice") {
        const prompt = currentBlock.payload?.prompt ?? "Pregunta";
        const options = currentBlock.payload?.options ?? [];

        return (
            <LearnOrganism
                title={lesson.title}
                prompt={prompt}
                options={options}
                onSelect={(id) => submitAnswer(id)}
                disabled={isSubmitting}
                feedback={lastResponse}
                onNext={goToNext}
            />
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold">{lesson.title}</h2>
            <p>Tipo de bloque no soportado: {currentBlock.type}</p>
        </div>
    );
}