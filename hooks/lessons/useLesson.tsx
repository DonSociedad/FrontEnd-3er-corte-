"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getLessonById, answerLesson, completeLessonService } from "@/libs/lessonsService";

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

// Clave para el array de lecciones en localStorage
const LOCAL_COMPLETED_KEY = "completedLessons";

const saveLocalProgress = (lessonId: string) => {
  if (typeof window === "undefined") return;

  // VALIDACIÓN DE SEGURIDAD
  if (!lessonId) {
      console.error("❌ Error: Se intentó guardar un ID vacío/nulo");
      return;
  }

  try {
    const raw = sessionStorage.getItem(LOCAL_COMPLETED_KEY);
    let currentIds: string[] = [];
    try {
      currentIds = JSON.parse(raw ?? "[]");
      if (!Array.isArray(currentIds)) currentIds = [];
    } catch {
      currentIds = [];
    }

    if (!currentIds.includes(lessonId)) {
      currentIds.push(lessonId);
      sessionStorage.setItem(LOCAL_COMPLETED_KEY, JSON.stringify(currentIds));
      console.log("✅ Progreso guardado localmente. Nueva lista:", currentIds);
    } else {
      console.log("⚠️ La lección ya estaba guardada anteriormente.");
    }
  } catch (error) {
    console.error("Error guardando progreso local:", error);
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

  // 1. Cargar la lección
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

  const currentBlock = lesson?.contentBlocks && lesson.contentBlocks.length > 0 
    ? lesson.contentBlocks[currentIndex] 
    : null;

  // 2. Lógica para avanzar y completar
const goToNext = async () => {
    if (!lesson?.contentBlocks) return;
    const next = currentIndex + 1;
    
    // === CASO: LECCIÓN COMPLETADA ===
    if (next >= lesson.contentBlocks.length) {
      
      console.log("🏁 Intentando finalizar lección. ID:", lessonId);

      // 1. VALIDACIÓN CRÍTICA
      if (!lessonId) {
        alert("ERROR FATAL: lessonId es undefined o vacío");
        return;
      }

      // 2. INTENTO DE GUARDADO MANUAL (Sin usar la función helper externa para probar)
      try {
        const key = "completedLessons";
        const raw = sessionStorage.getItem(key);
        let ids: string[] = JSON.parse(raw ?? "[]");

        if (!Array.isArray(ids)) ids = [];

        if (!ids.includes(lessonId)) {
            ids.push(lessonId);
            sessionStorage.setItem(key, JSON.stringify(ids));
            console.log("💾 Guardado ejecutado. Nuevos IDs:", ids);
        } else {
            console.log("💾 El ID ya existía en la lista.");
        }

        // 3. VERIFICACIÓN INMEDIATA
        const check = sessionStorage.getItem(key);
        console.log("🔍 Verificación post-guardado:", check);

        if (!check || !check.includes(lessonId)) {
            alert("ERROR: Se intentó guardar pero el SessionStorage sigue sin tener el ID.");
            return; // NO REDIRIGIR SI FALLÓ
        }

      } catch (e: any) {
        alert("Error escribiendo en storage: " + e.message);
        return;
      }

      // 4. Sincronización Backend (Silenciosa)
      try {
        await completeLessonService(lessonId);
      } catch (err) {
        console.log("Backend sync failed (guest?)");
      }

      // 5. SI LLEGAMOS AQUÍ, ES SEGURO REDIRIGIR
      router.push('/map')
      return;
    }
    
    setCurrentIndex(next);
    setLastResponse(null);
  };

  // 3. Enviar respuesta
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

  return { 
    lesson, 
    loading, 
    error, 
    currentBlock, 
    submitAnswer, 
    isSubmitting, 
    lastResponse, 
    currentIndex, 
    goToNext 
  };
};

export default useLesson;