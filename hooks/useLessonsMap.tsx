import { useState, useEffect } from "react";
import { LessonMapItem } from "@/interfaces/lessons/lesson";
import { getLessonsMapService } from "@/libs/lessonsService";

const LOCAL_LEVEL_KEY = "currentLevel";

const readLocalCurrentLevel = (): number => {
  try {
    const raw = localStorage.getItem(LOCAL_LEVEL_KEY);
    const n = parseInt(raw ?? "", 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  } catch {
    return 1;
  }
};

export const useLessonsMap = () => {
  const [lessons, setLessons] = useState<LessonMapItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    setLoading(true);

    // ✔ Tomar el nivel ANTES de hacer la request
    const localLevel = readLocalCurrentLevel();

    // ✔ Enviar el currentLevel al backend
    const { data, error } = await getLessonsMapService(localLevel);

    if (error || !data) {
      console.error("Error cargando lecciones:", error);
      setLessons([]);
      setLoading(false);
      return;
    }

    const mapped = (data as any[])
      .map((item: any) => {
        if (item.status === "completed" || item.status === "available" || item.status === "locked") {
          return {
            id: item._id ?? item.id,
            title: item.title ?? "Sin título",
            order: typeof item.order === "number" ? item.order : 0,
            status: item.status,
          } as LessonMapItem;
        }

        const order = typeof item.order === "number" ? item.order : undefined;

        if (typeof item.unlocked === "boolean") {
          return {
            id: item._id ?? item.id,
            title: item.title ?? "Sin título",
            order: order ?? 0,
            status: item.unlocked ? "available" : "locked",
          } as LessonMapItem;
        }

        if (typeof item.completed === "boolean" && item.completed) {
          return {
            id: item._id ?? item.id,
            title: item.title ?? "Sin título",
            order: order ?? 0,
            status: "completed",
          } as LessonMapItem;
        }

        if (typeof item.minLevel === "number") {
          const unlocked = localLevel >= item.minLevel;
          return {
            id: item._id ?? item.id,
            title: item.title ?? "Sin título",
            order: order ?? 0,
            status: unlocked ? "available" : "locked",
          } as LessonMapItem;
        }

        if (order !== undefined) {
          const unlocked = localLevel >= order;
          return {
            id: item._id ?? item.id,
            title: item.title ?? "Sin título",
            order: order ?? 0,
            status: unlocked ? "available" : "locked",
          } as LessonMapItem;
        }

        return {
          id: item._id ?? item.id,
          title: item.title ?? "Sin título",
          order: order ?? 0,
          status: "available",
        } as LessonMapItem;
      })
      .sort((a, b) => a.order - b.order);

    if (mapped.length > 0 && mapped[0].status === "locked") {
      mapped[0].status = "available";
    }

    setLessons(mapped);
    setLoading(false);
  };

  const goToLesson = (id: string) => {
    window.location.href = `/learn/${id}`;
  };

  useEffect(() => {
    fetchLessons();
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_LEVEL_KEY) fetchLessons();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { lessons, loading, goToLesson };
};

export default useLessonsMap;
