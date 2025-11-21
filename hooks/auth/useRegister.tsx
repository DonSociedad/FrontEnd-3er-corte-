'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { RegisterDTO } from "@/interfaces/register"
import { useAuth } from "@/contexts/authContext" 

export function useRegister() {
    const router = useRouter();
    
    const { register: registerUser } = useAuth(); 

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterDTO>({
    });

    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        try {
            // Usamos la función del contexto
            const result = await registerUser(data);
            
            if (result.success) {
                alert("Registro exitoso. Redirigiendo al inicio de sesión...");
                router.push("/login"); 
            } else {
                alert(result.error || "Error al registrar usuario. Revisa los datos.");
            }
        } catch (error) {
            console.error("Error inesperado en hook register:", error);
            alert("Error de conexión con el servidor. Intenta más tarde.");
        }
    };

    const onErrors = () => {
        console.log("Errores encontrados en el formulario:", errors);
        alert("Información incompleta o errónea, revisa los campos.");
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors,
        errors,
    };
}