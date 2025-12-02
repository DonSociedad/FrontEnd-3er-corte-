import { z } from 'zod';

export const loginScheme = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio" })
    .email({ message: "Formato de correo inválido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" })
});

export const RegisterScheme = z.object({
    name: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 letras" }),
    lastName: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 letras" }),        
    email: z
      .string()
      .min(1, { message: "El correo es obligatorio" })
      .email({ message: "Formato de correo inválido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener mínimo 6 caracteres" }) // 5 es muy poco seguro
});