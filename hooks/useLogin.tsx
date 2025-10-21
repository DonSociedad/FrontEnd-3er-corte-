'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schemas/login"
import { loginService } from "@/libs/authService"

export  function useLogin() {
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
        alert("Información incompleta o errónea, vuelve a intentar");
    };
    return {
        register,
        handleSubmit,
        onSubmit,
        onErrors,
    };

}