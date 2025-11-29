'use client';

import useLesson from "@/hooks/lessons/useLesson";
import LearnOrganism from "@/components/organism/lessons/learnOrganism";
import { LearnClientProps } from "@/interfaces/lessons/learnClientProps";


export default function LearnClient({ lessonId }: LearnClientProps) {
    const { lesson, loading, error, currentBlock, submitAnswer, isSubmitting, lastResponse, goToNext } = useLesson(lessonId);

    if (loading) return <div className="p-4 text-slate-200">Cargando lección...</div>;
    if (error) return <div className="p-4 text-red-400">Error: {error}</div>;
    if (!lesson || !currentBlock) return <div className="p-4 text-slate-200">No hay preguntas en esta lección.</div>;

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
