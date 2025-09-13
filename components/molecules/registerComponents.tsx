'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterDTO } from "@/interfaces/register"
import { RegisterScheme } from "@/schemas/register"

import InputComponent from "@/components/atoms/inputComponents"
import ButtonComponent from "@/components/atoms/buttonComponents"
import { registerService } from "@/libs/authService"


export default function RegisterComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterScheme)
    });


    const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
        registerService(data)
        if (Object.keys(errors).length >1) {
            console.log(errors);
            alert('Error en el registro');
        } else {
            console.log(data);
            alert('Registro exitoso');
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
        idElement="lastname"
        nameElement="lastname"
        register={register}
        />

        <InputComponent
        label="Edad"
        typeElement="number"
        idElement="age"
        nameElement="age"
        register={register}
        />

        <InputComponent
        label="Fecha de nacimiento"
        typeElement="date"
        idElement="birthDate"
        nameElement="birthDate"
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


