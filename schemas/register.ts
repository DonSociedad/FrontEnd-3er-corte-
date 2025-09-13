import {z} from 'zod'

export const registerScheme = z.object({
    name: z.string().min(2, { message: 'El nombre es obligatorio' }),
    lastname: z.string().min(2, { message: 'El apellido es obligatorio' }),
    age: z.number().min(1, { message: 'La edad es obligatoria' }),
    birthDate: z.string().min(1, { message: 'La fecha de nacimiento es obligatoria' }),
    email: z.email({ message: 'Error en mail no sirve' }).min(5, { message: 'El correo debe tener al menos 5 caracteres' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
});