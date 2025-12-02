const ERROR_MESSAGES: Record<string, string> = {
  // Códigos que esperamos del Backend (NestJS)
  'AUTH_EMAIL_EXISTS': 'Este correo ya está registrado. ¿Quieres iniciar sesión?',
  'AUTH_INVALID_CREDENTIALS': 'Correo o contraseña incorrectos.',
  'AUTH_USER_NOT_FOUND': 'No encontramos cuenta con este correo.',
  
  // Errores de red comunes
  'FETCH_ERROR': 'No pudimos conectar con el servidor.',
  'ECONNREFUSED': 'El servidor parece estar dormido.',
  
  // Fallback
  'DEFAULT': 'Ocurrió un error inesperado, intenta nuevamente.'
};

export const getErrorMessage = (errorKey: string | undefined | null): string => {
  if (!errorKey) return ERROR_MESSAGES['DEFAULT'];

  // 1. Buscamos coincidencia exacta con el código
  if (ERROR_MESSAGES[errorKey]) return ERROR_MESSAGES[errorKey];

  // 2. Si el backend manda mensajes "humanos" en inglés o códigos raros,
  // tratamos de identificar palabras clave (esto es un parche de seguridad)
  const lowerError = errorKey.toLowerCase();
  
  if (lowerError.includes('fetch') || lowerError.includes('network')) return ERROR_MESSAGES['FETCH_ERROR'];
  if (lowerError.includes('exist') || lowerError.includes('duplicate')) return ERROR_MESSAGES['AUTH_EMAIL_EXISTS'];
  if (lowerError.includes('credentials') || lowerError.includes('password')) return ERROR_MESSAGES['AUTH_INVALID_CREDENTIALS'];

  // 3. Si no sabemos qué es, devolvemos el default (o el error original si estás en modo debug)
  return ERROR_MESSAGES['DEFAULT'];
};