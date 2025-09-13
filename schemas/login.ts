import { z } from 'zod'

export const loginScheme = z.object({
    user: z.string().min(5, { message: 'El usuario es obligatorio' }),
    password: z.string().min(6, { message: 'La contraseña es obligatoria' })
})