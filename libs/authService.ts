import { apiFetch } from "./singletonFetch"
import { RegisterDTO } from "@/interfaces/register"
import { LoginDTO } from "@/interfaces/login"

export const loginService = async (body: LoginDTO) => {
  try {
    const response = await apiFetch("/auth/login", "POST", body);

    return { data: response, error: null };

  } catch (error: any) {
    console.error("Error en loginService:", error.message);
    return { data: null, error };
  }
};



export const registerService = async (body: RegisterDTO) => {
  try {
    const response = await apiFetch("/users", "POST", body);
    if (response.statusCode && response.statusCode >= 400) {
      throw new Error(response.message || "Error al registrar usuario");
    }
    return response;
  } catch (error: any) {
    console.error(" Error en registerService:", error.message || error);
    throw error;
  }
};

