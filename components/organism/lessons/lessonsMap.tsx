"use client";

import { LessonNode } from "@/components/atoms/lessons/lessonNode";
import { LessonPath } from "@/components/molecules/lessons/lessonsPath";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const LessonsMap = () => {
  const { lessons, loading, goToLesson } = useLessonsMap();
  const router = useRouter();


  if (loading) return <div className="py-50 text-center text-teal-600 font-bold animate-pulse">Cargando mapa...</div>;

  return (
    <section className="w-full min-h-screen bg-transparent flex flex-col items-center py-12 px-6">

      <div className="w-full mb-9 mr-140 "> 
            <button 
                onClick={() => router.back()} 
                className="flex items-center gap-2 text-teal-700/70 hover:text-teal-600 transition-colors font-bold group"
            >
                <ArrowLeftIcon className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="text-lg">
                  Volver
                </span>
            </button>



      </div>


        <h2 className="text-cyan-900 font-extrabold mb-2 text-2xl text-center tracking-tight">
          Mapa de lecciones
        </h2>
        <p className="text-center text-teal-700/60 text-sm">Tu camino hacia el aprendizaje</p>

      <div className="flex flex-col items-center gap-7 w-full max-w-md mt-5">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="flex flex-col items-center w-full">
            <LessonNode
              status={lesson.status}
              title={lesson.title}
              onClick={() => goToLesson(lesson.id)}
            />
            {index < lessons.length - 1 && <LessonPath />}
          </div>
        ))}
      </div>
      
    </section>
  );
};