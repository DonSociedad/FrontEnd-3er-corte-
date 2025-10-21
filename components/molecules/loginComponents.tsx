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
    const { email, password } = data;
    const { data: loginData, error } = await loginService({ email, password });

    if (error) {
      console.error("Error en el login:", error);
      alert("Error en el login, por favor verifica tus credenciales.");
      return;
    }

    // Guardar el token en cookies directamente
    if (loginData?.access_token) {
      Cookies.set("token", loginData.access_token, {
        expires: 7,       // Expira en 7 días
        secure: true,     // Solo HTTPS
        sameSite: "strict",
      });
      console.log("Login correcto", loginData);
    } else {
      console.warn("No se recibió token en la respuesta.", loginData);
    }

  } catch (err) {
    console.error("Error en login", err);
  }
};


    const onErrors = () => {
        console.log("Errores encontrados en el momento de login, vuelve a ver", errors);
        alert("Información incompleta o errónea, vuelve a intentar");
    };
    console.log("Errores actuales del formulario:", errors);

    return (
        <form
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
