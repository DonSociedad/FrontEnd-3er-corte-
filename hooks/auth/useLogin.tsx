'use client'

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form" // <--- Importar SubmitErrorHandler
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { LoginDTO } from "@/interfaces/access/login"
import { loginScheme } from "@/schemas/login"
import { useAuth } from "@/contexts/authContext"
import { useNotification } from "@/contexts/notificationContext"
import getFriendlyErrorMessage from "@/utils/authErrors"

export default function useLogin() {
    const { login } = useAuth();
    const router = useRouter();
    const { showNotification } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginDTO>({
        resolver: zodResolver(loginScheme),
    });

    const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
       try {
            const result = await login(data);
            if (result.success) {
                router.push("/map"); 
            } else {
                const friendlyMessage = getFriendlyErrorMessage(result.error || "");
                showNotification(friendlyMessage, 'error');
            }
        } catch (err) {
            showNotification("Ocurrió un error inesperado.", 'error');
        }
    };

    const onErrors: SubmitErrorHandler<LoginDTO> = (errors) => {
        const firstError = Object.values(errors)[0];
        
        if (firstError?.message) {
            showNotification(firstError.message, 'error'); 
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors,
        errors, 
        isSubmitting,
    };
}