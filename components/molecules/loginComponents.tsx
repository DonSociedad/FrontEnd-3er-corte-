'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"
import { loginService } from "@/libs/authService"

import InputComponent from "@/components/atoms/inputComponents"
import ButtonComponent from "@/components/atoms/buttonComponents"
import { th } from "zod/v4/locales"

export default function LoginComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDTO>({
        resolver: zodResolver(loginScheme),
    });

    const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
        try {
        const { user, password } = data;
        const { data: loginData, error } = await loginService({ user, password });

        if (error) {
            console.error("Error en el login:", error);
            alert("Error en el login, por favor verifica tus credenciales.");
            return;
        }

        if (loginData?.session) {
            Cookies.set("token", loginData.session.access_token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
            });
            console.log("Login correcto", loginData);
        } else {
            console.warn("No se recibió session en la respuesta.");
        }
        } catch (err) {
        console.error("Error en login", err);
        }
    };

    const onErrors = () => {
        console.log("Errores encontrados en el momento de login, vuelve a ver", errors);
        alert("Información incompleta o errónea, vuelve a intentar");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onErrors)}>
            
            <InputComponent
                label="Usuario o correo electrónico"
                typeElement="text"
                idElement="user"
                nameElement="user"
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
