'use client'

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form" // <--- Agrega SubmitErrorHandler
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { RegisterDTO } from "@/interfaces/access/register"
import { RegisterScheme } from "@/schemas/register"
import { useAuth } from "@/contexts/authContext" 
import { useNotification } from "@/contexts/notificationContext"
import getFriendlyErrorMessage from "@/utils/authErrors"

export default function useRegister() {
    const router = useRouter();
    const { showNotification } = useNotification();
    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterScheme)
    });

    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        try {
            const result = await registerUser(data);
            
            if (result.success) {
                showNotification("Registro exitoso. Redirigiendo...", 'success');
                router.push("/login");
            } else {
                const friendlyMessage = getFriendlyErrorMessage(result.error || "");
                showNotification(friendlyMessage, 'error');
            }
        } catch (error) {
            console.error("Error inesperado:", error);
            showNotification("Error de conexión con el servidor.", 'error');
        }
    };

    const onErrors: SubmitErrorHandler<RegisterDTO> = (errors) => {
        const firstError = Object.values(errors)[0];
        
        if (firstError && firstError.message) {
            showNotification(firstError.message, 'error'); 
        } else {
            showNotification("Información incompleta. Revisa el formulario.", 'error');
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors, 
        errors,
        isSubmitting
    };
}