'use client'

import useRegister from "@/hooks/auth/useRegister";
import InputComponent from "../../atoms/inputComponents";
import ButtonComponent from "../../atoms/buttonComponents";


export default function RegisterComponent() {
    const { register, handleSubmit, onSubmit, onErrors } = useRegister();
    
    return (
        <form
            data-testid="form"
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
            type={2}
            content="Registrate"
        />
        </form>
    );
}


