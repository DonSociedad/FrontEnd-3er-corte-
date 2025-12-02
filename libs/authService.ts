import { apiFetch } from "./singletonFetch"
import { RegisterDTO } from "@/interfaces/access/register"
import { LoginDTO } from "@/interfaces/access/login"

export const loginService = async (body: LoginDTO) => {
  try {
    const response = await apiFetch("/auth/login", "POST", body);
    
    if (response.error) {
        throw new Error(response.message || "Error en el login");
    }

    return { data: response, error: null };

  } catch (error: any) {
    console['error']("Error en loginService:", error.message || error);
    return { data: null, error: error.message || "Error desconocido" };
  }
};
export const registerService = async (body: RegisterDTO) => {
  try {
    const response = await apiFetch("/users", "POST", body);
    
    if (response.statusCode && response.statusCode >= 400) {
      throw new Error(response.message || "Error al registrar usuario");
    }
    
    return { data: response, error: null };

  } catch (error: any) {
    console.error("Error en registerService:", error.message || error);
    throw error; 
  }
};