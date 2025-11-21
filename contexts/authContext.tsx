'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginService, registerService } from "@/libs/authService"; // Ajusta la ruta a tu authService
import { LoginDTO } from "@/interfaces/login";
import { RegisterDTO } from "@/interfaces/register";

// --- Tipos ---

interface User {
  email: string;
  id: string;
  exp?: number; // Expiración del token
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginDTO) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterDTO) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

// --- Helpers para Cookies y JWT (Sin librerías externas) ---

const setCookie = (name: string, value: string, hours: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const parseJwt = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decoded = JSON.parse(jsonPayload);
    return {
      email: decoded.email,
      id: decoded.sub, 
      exp: decoded.exp
    };
  } catch (e) {
    return null;
  }
};

// --- Contexto ---

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 1. Verificar sesión al cargar la app
  useEffect(() => {
    const initAuth = () => {
      const token = getCookie("token");
      if (token) {
        const userData = parseJwt(token);
        // Verificar si el token ha expirado (opcional pero recomendado)
        if (userData && userData.exp && userData.exp * 1000 > Date.now()) {
          setUser(userData);
        } else {
          // Si expiró, limpiamos
          removeCookie("token");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // 2. Función de Login
  const login = async (body: LoginDTO) => {
    setIsLoading(true);
    const { data, error } = await loginService(body);

    if (error || !data || !data.access_token) {
      setIsLoading(false);
      return { success: false, error: error?.message || "Credenciales inválidas" };
    }

    const token = data.access_token;
    
    // Guardar en Cookie (1 hora de expiración)
    setCookie("token", token, 1);

    const userData = parseJwt(token);
    setUser(userData);

    setIsLoading(false);
    return { success: true };
  };

  // 3. Función de Registro
  const register = async (body: RegisterDTO) => {
    setIsLoading(true);
    try {
      await registerService(body);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  // 4. Función de Logout
  const logout = () => {
    removeCookie("token");
    setUser(null);
    localStorage.removeItem("currentLevel"); 
    router.push("/login");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);