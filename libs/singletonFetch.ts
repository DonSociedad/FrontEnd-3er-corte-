// singletonFetch.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const apiFetch = async (endpoint: string, method: methods, body?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
};
