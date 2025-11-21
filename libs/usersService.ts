import { apiFetch } from "./singletonFetch";

export const increaseUserLevel = async () => {
  try {
    const response = await apiFetch("/users/progress/next-level", "POST");
    return { data: response, error: null };
  } catch (error: any) {
    console.error("Error en increaseUserLevel:", error.message);
    return { data: null, error };
  }
};
