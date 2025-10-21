import { apiFetch } from "./singletonFetch"
import { RegisterDTO } from "@/interfaces/register"
import { LoginDTO } from "@/interfaces/login"

export const loginService = async (body: LoginDTO) => {
  try {
    const response = await apiFetch("/auth/login", "POST", body);

    // Si el backend devuelve el token, lo guardamos en localStorage
    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    return response;
  } catch (error: any) {
    console.error("❌ Error en loginService:", error.message);
    throw error;
  }
};

// 🔹 Registro del usuario
export const registerService = async (body: RegisterDTO) => {
  try {
    const response = await apiFetch("/users", "POST", body);
    return response;
  } catch (error: any) {
    console.error("❌ Error en registerService:", error.message);
    throw error;
  }
};
