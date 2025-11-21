"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// 1. Importamos el servicio para actualizar el nivel en el backend
import { getLessonById, answerLesson } from "@/libs/lessonsService";
import { increaseUserLevel } from "@/libs/usersService"; // Asegúrate que la ruta sea correcta

type ContentBlock = {
  id: string;
  type: string;
  payload?: any;
};

type Lesson = {
  _id: string;
  title: string;
  order?: number;
  contentBlocks?: ContentBlock[];
};

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

const updateLocalCurrentLevelIfLower = (targetLevel: number) => {
  try {
    const cur = readLocalCurrentLevel();
    if (targetLevel > cur) {
      localStorage.setItem(LOCAL_LEVEL_KEY, String(targetLevel));
    }
  } catch {
  }
};

export const useLesson = (lessonId: string) => {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<null | { correct: boolean; explanation?: string }>(null);

  const fetchLesson = async () => {
    setLoading(true);
    try {
      const { data, error } = await getLessonById(lessonId);
      if (error || !data) {
        throw error ?? new Error("No data returned from getLessonById");
      }
      setLesson(data as Lesson);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching lesson:", err?.message ?? err);
      setError(err?.message ?? "Error cargando lección");
      setLesson(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lessonId) return;
    fetchLesson();
    setCurrentIndex(0);
    setLastResponse(null);
  }, [lessonId]);

  const currentBlock = lesson?.contentBlocks && lesson.contentBlocks.length > 0 ? lesson.contentBlocks[currentIndex] : null;

  const goToNext = async () => {
    if (!lesson?.contentBlocks) return;
    const next = currentIndex + 1;
    
    // SI SE TERMINÓ LA LECCIÓN:
    if (next >= lesson.contentBlocks.length) {
      
      const order = typeof lesson.order === "number" ? lesson.order : undefined;
      if (order !== undefined) {
        const targetLevel = order + 1;
        updateLocalCurrentLevelIfLower(targetLevel);
      } else {
        try {
          const cur = readLocalCurrentLevel();
          updateLocalCurrentLevelIfLower(cur + 1);
        } catch { }
      }

      try {
        await increaseUserLevel(); 
        console.log("Nivel incrementado en Backend");
      } catch (err) {
        console.error("Error actualizando nivel en backend:", err);
      }

      // Redirección
      router.push("/map");
      return;
    }
    
    // SI NO SE TERMINÓ, SEGUIMOS AL SIGUIENTE BLOQUE
    setCurrentIndex(next);
    setLastResponse(null);
  };

  const submitAnswer = async (answer: any) => {
    if (!currentBlock) return null;
    setIsSubmitting(true);
    try {
      const { data: res, error } = await answerLesson(lessonId, currentBlock.id, answer);
      if (error || !res) {
        throw error ?? new Error("No data returned from answerLesson");
      }
      setLastResponse(res as { correct: boolean; explanation?: string });
      setIsSubmitting(false);
      return res;
    } catch (err: any) {
      console.error("Error submitting answer:", err?.message ?? err);
      setError(err?.message ?? "Error enviando respuesta");
      setIsSubmitting(false);
      return null;
    }
  };

  return { lesson, loading, error, currentBlock, submitAnswer, isSubmitting, lastResponse, currentIndex, goToNext };
};

export default useLesson;