// src/utils/authErrors.ts

/**
 * Mapeo de errores provenientes del Backend (NestJS Exceptions)
 * a mensajes amigables para el usuario en el Frontend.
 */
export const AUTH_ERROR_MAP: Record<string, string> = {
    // Errores definidos en UsersService
    "The email is already registered": "Este correo electrónico ya está en uso. ¿Intentas iniciar sesión?",
    "Invalid credentials": "El correo o la contraseña son incorrectos. Verifícalos.",
    "User not found": "No existe una cuenta asociada a este correo.",
    "No tienes el item": "No posees este objeto en tu inventario.",
    
    // Errores genéricos de NestJS / HTTP
    "Unauthorized": "No tienes permiso para realizar esta acción.",
    "Forbidden": "Acceso denegado.",
    "Internal Server Error": "Ocurrió un problema en el servidor. Intenta más tarde.",
};

/**
 * Función helper para obtener el mensaje.
 * Si el error no está en el mapa, devuelve un mensaje genérico
 */
export default function getFriendlyErrorMessage(backendMessage: string): string {
    // A veces los errores vienen como array (ej: class-validator), tomamos el primero si es el caso
    if (Array.isArray(backendMessage)) {
        return backendMessage[0];
    }

    return AUTH_ERROR_MAP[backendMessage] || "Ocurrió un error inesperado. Por favor, intenta de nuevo.";
}