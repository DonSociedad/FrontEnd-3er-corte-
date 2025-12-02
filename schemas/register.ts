import { z } from 'zod'

export const RegisterScheme = z.object({
    name: z.string()
        .min(1, { message: "El nombre es obligatorio" }) 
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" }), 
    
    lastName: z.string()
        .min(1, { message: "El apellido es obligatorio" })
        .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
   
    email: z.string()
        .min(1, { message: "El correo es obligatorio" })
        .email({ message: 'Error en mail no sirve' }), 
    
    password: z.string()
        .min(1, { message: "La contraseña es obligatoria" })
        .min(5, { message: "La contraseña debe tener al menos 5 caracteres" }) 
})