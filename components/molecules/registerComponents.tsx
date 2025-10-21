'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterDTO } from "@/interfaces/register"
import { RegisterScheme } from "@/schemas/register"

import InputComponent from "@/components/atoms/inputComponents"
import ButtonComponent from "@/components/atoms/buttonComponents"
import { registerService } from "@/libs/authService"
import { useRouter } from "next/navigation";


export default function RegisterComponent() {
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

        // Si registerService devuelve un JSON con éxito:
        if (response && !response.error) {
        alert("✅ Registro exitoso. Redirigiendo al inicio de sesión...");
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
    
    return (
        <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
        >
        
        <InputComponent
        label="Nombre"
        typeElement="text"
        idElement="name"
        nameElement="name"
        register={register}
        />

        <InputComponent
        label="Apellido"
        typeElement="text"
        idElement="lastName"
        nameElement="lastName"
        register={register}
        />

        <InputComponent
        label="Correo electrónico"
        typeElement="email"
        idElement="email"
        nameElement="email"
        register={register}
        />

        <InputComponent
        label="Contraseña"
        typeElement="password"
        idElement="password"
        nameElement="password"
        register={register}
        />

        <ButtonComponent
            type={3}
            content="Iniciar sesión"
        />
        </form>
    );
}


