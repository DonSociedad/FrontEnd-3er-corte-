"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

const THEME = {
  bgMain: "#ebd1dbff",         
  
  peach: {
    main: "#f0b9a8ff",         
    shadow: "#c9998aff",        
    light: "#ffccbc",         
  },

  pink: {
    main: "#f1c0d0ff",
    shadow: "#cf88a7ff",
    bg: "#fce4ec",           
  },

  blue: {
    main: "#81d4fa",
    shadow: "#71b8e0ff",
    light: "#e1f5fe",
  },

  text: {
    dark: "#717888ff",         
    light: "#d89595ff",         
    dim: "#707883ff",          
  }
};

export default function SidebarRight() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <aside 
      className="hidden lg:flex flex-col w-96 p-6 fixed right-0 top-0 h-screen overflow-y-auto border-l-4 border-pink-200"
      style={{ backgroundColor: THEME.bgMain }}
    >
      
      {/* --- ESTADO: GUEST (INVITADO) --- */}
      {!isAuthenticated && (
        <div 
          className="rounded-2xl p-6 mb-8 border-2 relative overflow-hidden transition-all hover:-translate-y-1"
          style={{ 
            backgroundColor: "rgba(235, 189, 175, 0.1)", // Melocotón transparente
            borderColor: THEME.peach.main,
            boxShadow: `0 6px 0 0 ${THEME.peach.shadow}` // Sombra de la tarjeta
          }}
        >
          <h3 className="text-xl font-black mb-2 text-white tracking-wide">
            ¡Guarda tu progreso!
          </h3>
          <p className="mb-6 text-sm font-medium" style={{ color: THEME.text.dim }}>
            Crea un perfil para no perder tu racha ni tus monedas.
          </p>
          
          <div className="flex flex-col gap-4">
            {/* BOTÓN 1: CREAR PERFIL (MELOCOTÓN) */}
            <button
              onClick={() => router.push("/register")}
              className="w-full py-3 rounded-xl font-bold text-slate-900 transition-all active:translate-y-1 active:shadow-none"
              style={{ 
                backgroundColor: THEME.peach.main,
                boxShadow: `0 4px 0 0 ${THEME.peach.shadow}` 
              }}
            >
              CREAR PERFIL
            </button>
          
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3 rounded-xl font-bold border-2 uppercase transition-all active:translate-y-1 active:shadow-none hover:bg-slate-800"
              style={{ 
                borderColor: THEME.blue.main,
                color: THEME.blue.main,
                backgroundColor: "#e1f5fe",
                boxShadow: `0 4px 0 0 ${THEME.blue.shadow}` 
              }}
            >
              Ingresar
            </button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div 
          className="rounded-2xl p-6 mb-8 border-2 transition-all hover:-translate-y-1"
          style={{ 
            backgroundColor: "rgba(129, 212, 250, 0.1)",
            borderColor: THEME.blue.main,
            boxShadow: `0 6px 0 0 ${THEME.blue.shadow}` 
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Tu Estudio</h3>
          </div>
          
          <div className="flex flex-col items-center gap-4">

            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4"
              style={{
                backgroundColor: THEME.bgMain,
                borderColor: THEME.pink.main,
                boxShadow: `0 4px 0 0 ${THEME.pink.shadow}`
              }}
            >
              🎨
            </div>
            
            <p className="text-center text-sm font-medium" style={{ color: THEME.text.dim }}>
              ¡Visita el estudio y personaliza tu personaje!
            </p>

            <button
              onClick={() => router.push("/creator-studio")}
              className="w-full py-3 rounded-xl font-bold text-slate-900 transition-all active:translate-y-1 active:shadow-none uppercase"
              style={{ 
                backgroundColor: THEME.pink.main,
                boxShadow: `0 4px 0 0 ${THEME.pink.shadow}`
              }}
            >
              Ir al Estudio
            </button>
          </div>
        </div>
      )}

      <div 
        className="rounded-2xl p-5 mb-6 border-b-4 transition-transform hover:scale-[1.02]"
        style={{ 
          backgroundColor: THEME.pink.bg, 
          borderColor: THEME.pink.shadow     
        }}
      >
        <h3 className="text-lg font-black mb-4" style={{ color: THEME.pink.shadow }}>
          LIGAS
        </h3>
        <div className="flex items-center gap-4">
            <div 
              className="w-25 h-25 rounded-xl flex items-center justify-center shrink-0 border-2"
              style={{ 
                backgroundColor: THEME.blue.light,
                borderColor: THEME.blue.main 
              }}
            >
              <Image    
                src="/liga.png" 
                alt="Liga Bronce" 
                width={90} 
                height={90} 
                className="object-contain drop-shadow-md"
              />
            </div>
            <p className="text-sm font-bold leading-tight" style={{ color: THEME.text.dark }}>
              Completa más lecciones para subir a la <span style={{ color: THEME.peach.shadow }}>Liga de Bronce</span>.
            </p>
        </div>
      </div>

    </aside>
  );
}
{/*Hago un comentario para decir que esto del color es genial, basense en el, pls */}