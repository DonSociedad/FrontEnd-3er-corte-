// src/components/organism/lessons/LessonsMap.tsx
"use client";

import { LessonNode } from "@/components/atoms/lessons/lessonNode";
import { LessonPath } from "@/components/molecules/lessons/lessonsPath";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

export const LessonsMap = () => {
  const { lessons, loading, goToLesson } = useLessonsMap();

  if (loading) return <div className="py-50 text-center text-white">Cargando...</div>;

  return (
    <section className="w-full min-h-screen bg-#ebd1dbff flex flex-col items-center py-12 px-6">
      
      <h2 className="text-gray-600 font-bold mb-9 text-xl text-center">
        Mapa de lecciones
      </h2>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
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