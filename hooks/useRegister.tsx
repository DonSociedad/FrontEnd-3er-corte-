'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { RegisterDTO } from "@/interfaces/register"
import { registerService } from "@/libs/authService"
import { useRouter } from "next/navigation";
export function useRegister() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterDTO>({
    });


    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    try {
        const response = await registerService(data); 
        
        if (response && !response.error) {
        alert("Registro exitoso. Redirigiendo al inicio de sesión...");
        router.push("/login"); 
        } else {
        alert("Error al registrar usuario. Revisa los datos e inténtalo de nuevo.");
        console.error("Error en el registro:", response);
        }
    } catch (error) {
        console.error("Error inesperado en registerService:", error);
        alert("Error de conexión con el servidor. Intenta más tarde.");
    }
    };

    const onErrors=() => {
        console.log("Errores encontrados en el momento de registro, vuelve a ver",errors);
        alert("Información incompleta o errónea, vuelve a intentar");
    };
    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors,
    };
}