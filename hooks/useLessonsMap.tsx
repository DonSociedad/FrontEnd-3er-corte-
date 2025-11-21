// hooks/useLessonsMap.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getLocalCompletedLessons, getLessonsMapService } from "@/libs/lessonsService";

type LessonItem = {
  id: string;
  title: string;
  order?: number;
  status: "completed" | "available" | "locked";
};

export const useLessonsMap = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMap = useCallback(async () => {
    setLoading(true);
    try {
      const localIds = getLocalCompletedLessons();
      const { data, error } = await getLessonsMapService(localIds);
      if (error) {
        console.error("getLessonsMapService error:", error);
        setError(String(error));
        setLessons([]);
      } else {
        setLessons(data || []);
        setError(null);
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Error fetching map");
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMap();
    // Re-consultar si otra pestaña modifica completedLessons
    const onStorage = (e: StorageEvent) => {
      if (e.key === "completedLessons") fetchMap();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [fetchMap]);

  const goToLesson = (id: string) => {
    if (!id) return;
    router.push(`/learn/${id}`);
  };

  return { lessons, loading, error, goToLesson, refresh: fetchMap } as const;
};

export default useLessonsMap;
