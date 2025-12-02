'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { RegisterDTO } from "@/interfaces/access/register"
import { useAuth } from "@/contexts/authContext" 
import { useNotification } from "@/contexts/notificationContext"

export function useRegister() {
    const router = useRouter();
    const { showNotification } = useNotification();

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
                showNotification("Registro exitoso. Redirigiendo al inicio de sesión...", 'success');
                router.push("/login");
            } else {
                showNotification(result.error || "Error al registrar usuario. Revisa los datos.", 'error');
            }
        } catch (error) {
            console.error("Error inesperado en hook register:", error);
            showNotification("Error de conexión con el servidor. Intenta más tarde.", 'error');
        }
    };

    const onErrors = () => {
        console.log("Errores encontrados en el formulario:", errors);
        showNotification("Información incompleta o errónea, revisa los campos.", 'error');
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors,
        errors,
    };
}