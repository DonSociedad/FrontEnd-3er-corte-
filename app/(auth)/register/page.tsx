'use client';

import RegisterComponent from "@/components/molecules/auth/registerComponents"

import type { ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { ArrowLeftIcon } from "lucide-react";

type SocialButtonProps = {
    provider: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    iconPath?: ReactNode;
    textColor?: string;
};

const SocialButton = ({ provider, onClick, iconPath }: SocialButtonProps) => (
    <button 
        onClick={onClick}
        className="group relative w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-pink-300 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-pink-400"
    >
        <div className="absolute left-4 flex items-center justify-center w-5 h-5">
            {iconPath}
        </div>
        <span>Continuar con {provider}</span>
    </button>
);

    const DividerWithLegal = () => (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-3 bg-white text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    O regístrate con
                </span>
            </div>
        </div>
    );

    const GoogleDisclaimer = () => (
        <p className="mt-5 text-center text-[10px] text-gray-400 leading-normal px-4">
            Protegido por reCAPTCHA Enterprise. Aplican la{' '}
            <a href="https://policies.google.com/privacy" className="underline hover:text-gray-600 transition-colors">Política de Privacidad</a> y los{' '}
            <a href="https://policies.google.com/terms" className="underline hover:text-gray-600 transition-colors">Términos de Servicio</a> de Google.
        </p>
    );


export default function RegisterPage() {
    const router = useRouter(); 

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            
            <main className="flex-grow flex items-center justify-center py-3 px-2 sm:px-6">
                
                <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                    <button 
                        onClick={() => router.back()} 
                        className="mb-4 flex items-center text-sm text-gray-400 hover:text-pink-500 transition-colors font-medium group">
                        <ArrowLeftIcon />
                        <span className="ml-1 group-hover:-translate-x-1 translate-x-0 transition-transform duration-200">
                            Volver
                        </span>
                    </button>

                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                            Únete a <span className="text-pink-500">Piglance</span>
                        </h1>
                        <p className="mt-1 text-xs sm:text-sm text-gray-500">
                            Crea tu cuenta y comienza a aprender hoy.
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <RegisterComponent/>
                    </div>

                    <DividerWithLegal />

                    <div className="space-y-3">
                        <SocialButton 
                            provider="Google" 
                            iconPath={<GoogleIcon />} 
                        />
                        <SocialButton 
                            provider="Apple" 
                            iconPath={<AppleIcon />} 
                        />
                        <SocialButton 
                            provider="Facebook" 
                            iconPath={<FacebookIcon />} 
                        />
                    </div>
                    <div className="mt-6 border-t border-gray-100 pt-4">
                        <p className="text-center text-xs sm:text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="font-bold px-5 py-6 text-pink-500 hover:text-pink-600 transition-colors">
                                Iniciar sesión
                            </Link>
                        </p>
                        <GoogleDisclaimer />
                    </div>

                </div>
            </main>
        </div>
    );
}

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M12.0003 20.45c4.6653 0 8.577-3.9116 8.577-8.577 
        0-.7567-.089-1.4883-.243-2.185h-8.334v4.145h4.945c-.4825 2.155-2.22 
        3.8266-4.945 3.8266-2.9467 0-5.3334-2.3867-5.3334-5.3334s2.3867-5.3333 5.3334-5.3333c1.3534 
        0 2.5834.4716 3.5517 1.2533l3.015-3.015C16.8903 3.655 14.6053 2.6233 12.0003 
        2.6233 6.822 2.6233 2.6237 6.8216 2.6237 12s4.1983 9.3766 9.3766 8.45z" fill="currentColor" />
    </svg>
)

const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 
        1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208
        3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 
        1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 
        2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 
        1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
    </svg>
)

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 
        5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 
        1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 
        0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)