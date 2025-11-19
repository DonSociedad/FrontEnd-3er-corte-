import { apiFetch } from "./singletonFetch";
import { LessonMapItem } from "@/interfaces/lessons/lesson";

export const getLessonsMapService = async () => {
  try {
    const response = await apiFetch("/lessons/map", "GET");

    return { data: response as LessonMapItem[], error: null };

  } catch (error: any) {
    console.error("Error en getLessonsMapService:", error.message);
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
