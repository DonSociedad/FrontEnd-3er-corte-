"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLessonById, answerLesson, completeLessonService } from "@/libs/lessonsService";

// Tipos auxiliares
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

// Estado de la lección para manejar la UI
type LessonStatus = 'playing' | 'failed' | 'completed';

export const useLesson = (lessonId: string) => {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<null | { correct: boolean; explanation?: string }>(null);

  // NUEVOS ESTADOS
  const [mistakes, setMistakes] = useState(0); 
  const [lessonStatus, setLessonStatus] = useState<LessonStatus>('playing');

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
    resetLessonState();
  }, [lessonId]);

  // Función auxiliar para reiniciar todo
  const resetLessonState = () => {
    setCurrentIndex(0);
    setLastResponse(null);
    setMistakes(0);
    setLessonStatus('playing');
  };

  const currentBlock = lesson?.contentBlocks && lesson.contentBlocks.length > 0 
    ? lesson.contentBlocks[currentIndex] 
    : null;

  // 2. Lógica para avanzar y completar
  const goToNext = async () => {
    if (!lesson?.contentBlocks) return;
    const next = currentIndex + 1;
    
    // === CASO: FINAL DE LA LECCIÓN ===
    if (next >= lesson.contentBlocks.length) {
      
      // VALIDACIÓN DE ERRORES: Si hubo errores, mostramos pantalla de fallo
      if (mistakes > 0) {
        console.log(`Lección terminada con ${mistakes} errores. No se guarda progreso.`);
        setLessonStatus('failed'); 
        return;
      }

      // Si no hubo errores, guardamos progreso y redirigimos
      console.log("🏆 Lección perfecta. Guardando progreso...");

      if (!lessonId) {
        alert("ERROR FATAL: lessonId es undefined");
        return;
      }

      try {
        const key = "completedLessons";
        const raw = sessionStorage.getItem(key);
        let ids: string[] = JSON.parse(raw ?? "[]");
        if (!Array.isArray(ids)) ids = [];

        if (!ids.includes(lessonId)) {
            ids.push(lessonId);
            sessionStorage.setItem(key, JSON.stringify(ids));
        }

        // Sincronización Backend
        await completeLessonService(lessonId);
        
        // Redirección exitosa
        router.push('/map');
      } catch (e: any) {
        console.error("Error al guardar:", e);
      }
      return;
    }
    
    // Si no es el final, avanzamos
    setCurrentIndex(next);
    setLastResponse(null);
  };

  // 3. Enviar respuesta
  const submitAnswer = async (answer: any) => {
    if (!currentBlock) return null;
    setIsSubmitting(true);
    try {
      const { data: res, error } = await answerLesson(lessonId, currentBlock.id, answer);
      
      if (error || !res) throw error ?? new Error("Error en respuesta");
      
      const responseData = res as { correct: boolean; explanation?: string };
      setLastResponse(responseData);

      if (!responseData.correct) {
         setMistakes(prev => prev + 1);
      }

      setIsSubmitting(false);
      return res;
    } catch (err: any) {
      console.error("Error submitting answer:", err);
      setIsSubmitting(false);
      return null;
    }
  };

  // Función para reintentar desde la UI
  const retryLesson = () => {
    resetLessonState();
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
    goToNext,
    lessonStatus, 
    retryLesson,   
    mistakes      
  };
};

export default useLesson;