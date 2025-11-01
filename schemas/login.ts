import { z } from 'zod';

export const loginScheme = z.object({
  email: z.string(),
  password: z.string()
    .min(6, { message: 'La contraseña es obligatoria' })
});
