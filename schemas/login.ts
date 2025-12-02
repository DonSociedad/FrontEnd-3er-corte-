import { z } from 'zod';

export const loginScheme = z.object({
  email: z.string()
      .min(1, { message: "Ingresa tu correo electrónico" })
      .email({ message: "Formato de correo inválido" }),

  password: z.string()
      .min(1, { message: "Ingresa tu contraseña" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }) 
});