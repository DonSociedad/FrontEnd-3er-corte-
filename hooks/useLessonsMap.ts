import { useState, useEffect } from "react";
import { LessonMapItem } from "@/interfaces/lessons/lesson";
import { getLessonsMapService } from "@/libs/lessonsService";

export const useLessonsMap = () => {
  const [lessons, setLessons] = useState<LessonMapItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    const { data, error } = await getLessonsMapService();

    if (error || !data) {
      console.error("Error cargando lecciones:", error);
      setLessons([]);
      setLoading(false);
      return;
    }

    // Map backend response to front-end LessonMapItem
    const mapped = data
      .map((item: any) => ({
        id: item._id ?? item.id,
        title: item.title ?? "Sin título",
        order: item.order ?? 0,
        prerequisites: item.prerequisites ?? [],
        // If backend provides minLevel, use it to decide availability. Default to available.
        status:
          typeof item.minLevel === "number"
            ? item.minLevel <= 0
              ? ("available" as const)
              : ("locked" as const)
            : ("available" as const),
      }))
      .sort((a: LessonMapItem, b: LessonMapItem) => a.order - b.order);

    // Make sure first lesson is available (UX choice)
    if (mapped.length > 0 && mapped[0].status === "locked") {
      mapped[0].status = "available";
    }

    setLessons(mapped);
    setLoading(false);
  };

  const goToLesson = (id: string) => {
    // Placeholder navigation: will go to the learning page for the lesson id
    window.location.href = `/learn/${id}`;
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return { lessons, loading, goToLesson };
};
