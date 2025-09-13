import { z } from 'zod'

export const RegisterScheme = z.object({
    name: z.string().min(2, { message: "Se requiere minimo 2 caracteres" }),
    lastname: z.string().min(2, { message: "Se requiere minimo 2 caracteres" }),        
    email: z.email({ message: 'Error en mail no sirve' }).min(5, { message: "Se requiere minimo 5 caracteres" }),
    password: z.string().min(5, { message: "Se requiere minimo 5 caracteres" }),
    age: z.number().min(1, { message: "La edad debe ser mayor a 0" }),
    birthDate: z.string().min(5, { message: "Se requiere minimo 5 caracteres" })
    
})