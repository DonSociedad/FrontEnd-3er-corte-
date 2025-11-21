import { apiFetch } from "./singletonFetch";
import { LessonMapItem } from "@/interfaces/lessons/lesson";

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

export const getLessonsMapService = async (currentLevel?: number) => {
  try {
    const query = currentLevel ? `?currentLevel=${currentLevel}` : "";
    const response = await apiFetch(`/lessons/map${query}`, "GET");

    return { data: response as LessonMapItem[], error: null };
  } catch (error: any) {
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
