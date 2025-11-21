const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Función auxiliar para leer cookies en el cliente
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null; // Evita error en SSR
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const apiFetch = async (endpoint: string, method: methods, body?: any) => {
  // 1. Obtener el token 
  const token = getCookie('token'); 

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

   const options: RequestInit = {
    method,
    credentials: "include",
    headers,
    cache: 'no-store', 
    next: { revalidate: 0 } 
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (response.status === 401) {
    }
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
};