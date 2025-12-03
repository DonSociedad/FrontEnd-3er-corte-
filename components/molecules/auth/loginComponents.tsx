'use client'

import useLogin from "@/hooks/auth/useLogin"
import InputComponent from "@/components/atoms/inputComponents"
import ButtonComponent from "@/components/atoms/buttonComponents"

export default function LoginComponent() {
const { register, handleSubmit, onSubmit, onErrors } = useLogin();
    return (
        <form
            data-testid="form"
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
        >
            <InputComponent
                label="Usuario o correo electrónico"
                typeElement="text"
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

            <ButtonComponent type={2} content="Iniciar sesión" />

            </form>

    ); 
    
}
