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
