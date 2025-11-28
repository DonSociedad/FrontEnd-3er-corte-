import { LessonNode } from "@/components/atoms/lessons/lessonNode";
import { LessonPath } from "@/components/molecules/lessons/lessonsPath";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

export const LessonsMap = () => {
  const { lessons, loading, goToLesson } = useLessonsMap();

  if (loading) return <div className="py-20 text-center text-gray-300">Cargando...</div>;

  return (
    <section className="w-full max-w-md mx-auto py-12 px-4 flex flex-col items-center">
      <h2 className="text-gray-300 mb-6 text-lg">Mapa de lecciones</h2>

      <div className="flex flex-col items-center gap-6">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="flex flex-col items-center">
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
