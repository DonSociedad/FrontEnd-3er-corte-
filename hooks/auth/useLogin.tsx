'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { LoginDTO } from "@/interfaces/access/login"
import { loginScheme } from "@/schemas/login"
import { useAuth } from "@/contexts/authContext"
import { useNotification } from "@/contexts/notificationContext"

export function useLogin() {
    const { login } = useAuth(); // Usamos la función del contexto
    const router = useRouter();
    const { showNotification } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDTO>({
        resolver: zodResolver(loginScheme),
    });

    const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
        try {
            // El contexto se encarga de llamar al servicio, guardar cookie (1h) y actualizar estado
            const result = await login(data);

            if (result.success) {
                console.log("Login correcto");
                // Redirigimos al mapa
                router.push("/map"); 
            } else {
                // Si falló, mostramos el mensaje que devuelve el contexto
                showNotification(result.error || "Error en el login, verifica tus credenciales.", 'error');
            }

        } catch (err) {
            console.error("Error inesperado en login", err);
            showNotification("Ocurrió un error inesperado.", 'error');
        }
    };

    const onErrors = () => {
        showNotification("Información incompleta o errónea, vuelve a intentar", 'error');
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors,
        errors, 
    };
}