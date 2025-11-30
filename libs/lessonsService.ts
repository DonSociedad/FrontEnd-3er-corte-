import { apiFetch } from "./singletonFetch";
import { IAdminLesson, ICreateLessonPayload, LessonMapItem } from "@/interfaces/lessons/lesson";

export const createLessonService = async (lesson: ICreateLessonPayload) => {
  try {
    // El backend espera el body directo
    const response = await apiFetch('/lessons', 'POST', lesson);
    return { data: response, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

// Helper para leer IDs locales (Invitados)
export const getLocalCompletedLessons = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem("completedLessons"); 
    const parsed = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getLessonsMapService = async (localCompletedIds: string[]) => {
  try {
    const qp = localCompletedIds.length > 0
      ? `?completed=${localCompletedIds.map(encodeURIComponent).join(',')}`
      : "";

    const response = await apiFetch(`/lessons/map${qp}`, "GET");
    const normalized = (response as any[] || []).map(item => ({
      id: item._id ?? item.id,
      title: item.title,
      order: item.order,
      status: item.status
    }));
    return { data: normalized as LessonMapItem[], error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const completeLessonService = async (lessonId: string) => {
  try {
    const response = await apiFetch(`/lessons/${lessonId}/complete`, "POST");
    return { data: response, error: null };
  } catch (error: any) {
    console.error("Error completando lección:", error.message);
    return { data: null, error };
  }
};

export const getLessonById = async (id: string) => {
  try {
    const response = await apiFetch(`/lessons/${id}`, "GET");
    return { data: response, error: null };
  } catch (error: any) {
    console.error("Error en getLessonById:", error.message);
    return { data: null, error };
  }
};

export const answerLesson = async (id: string, blockId: string, answer: any) => {
  try {
    const payload = { blockId, answer };
    const response = await apiFetch(`/lessons/${id}/answer`, "POST", payload);
    return { data: response, error: null };
  } catch (error: any) {
    console.error("Error en answerLesson:", error.message);
    return { data: null, error };
  }
};

export const getAllLessonsService = async () => {
  try {
    // Llamamos al endpoint GET /lessons que acabamos de crear en el backend
    const response = await apiFetch('/lessons', 'GET');
    
    // Validamos que sea array
    if (!Array.isArray(response)) {
        return { data: [], error: null };
    }

    const lessons: IAdminLesson[] = response as IAdminLesson[];

    return { data: lessons, error: null };
  } catch (error: any) {
    console.error("Error fetching admin lessons:", error.message);
    return { data: null, error: error.message || "Error obteniendo lecciones" };
  }
};