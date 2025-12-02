"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

// Mantenemos tu excelente objeto de tema
const THEME = {
  bgMain: "#ebd1dbff",         
  
  peach: {
    main: "#f0b9a8ff",         
    shadow: "#c9998aff",        
    light: "#ffccbcff",         
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
    dim: "#837570ff",          
  }
};

export default function SidebarRight() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <aside 
      className={` hidden lg:flex flex-col  w-80 xl:w-96 h-screen  fixed right-0 top-0 overflow-y-auto p-6 border-l-4 z-30 transition-all duration-300`}
      style={{ 
        backgroundColor: THEME.bgMain,
        borderColor: THEME.pink.main 
      }}
    >
      
      {!isAuthenticated && (
        <div 
          className="rounded-2xl p-6 mb-8 border-2 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
          style={{ 
            backgroundColor: "hsla(14, 60%, 80%, 0.10)",
            borderColor: THEME.peach.main,
            boxShadow: `0 6px 0 0 ${THEME.peach.shadow}`
          }}
        >
          <h3 className="text-xl font-black mb-2 text-white tracking-wide drop-shadow-sm">
            ¡Guarda tu progreso!
          </h3>
          <p className="mb-6 text-sm font-medium leading-relaxed" style={{ color: THEME.text.dim }}>
            Crea un perfil para no perder tu racha ni tus monedas.
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/register")}
              className="w-full py-3 rounded-xl font-bold text-slate-900 transition-all active:translate-y-1 active:shadow-none hover:brightness-105"
              style={{ 
                backgroundColor: THEME.peach.main,
                boxShadow: `0 4px 0 0 ${THEME.peach.shadow}` 
              }}
            >
              CREAR PERFIL
            </button>
          
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3 rounded-xl font-bold border-2 uppercase transition-all active:translate-y-1 active:shadow-none hover:bg-white/50"
              style={{ 
                borderColor: THEME.blue.main,
                color: THEME.blue.main,
                backgroundColor: THEME.blue.light,
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
          className="rounded-2xl p-6 mb-8 border-2 transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: "rgba(129, 212, 250, 0.1)",
            borderColor: THEME.blue.main,
            boxShadow: `0 6px 0 0 ${THEME.blue.shadow}` 
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white drop-shadow-sm">Tu Estudio</h3>
          </div>
          
          <div className="flex flex-col items-center gap-5">
            <div 
              className="w-28 h-28 rounded-full flex items-center justify-center border-4 relative overflow-hidden bg-white"
              style={{
                borderColor: THEME.pink.main,
                boxShadow: `0 4px 0 0 ${THEME.pink.shadow}`
              }}
            >
              <Image    
                src="/images/icons/personalizar.png" 
                alt="Avatar Icon" 
                fill
                className="object-contain p-4"
              />
            </div>
            
            <p className="text-center text-sm font-medium px-2" style={{ color: THEME.text.dim }}>
              ¡Visita el estudio y personaliza tu personaje!
            </p>

            <button
              onClick={() => router.push("/creator-studio")}
              className="w-full py-3 rounded-xl font-bold text-slate-900 transition-all active:translate-y-1 active:shadow-none uppercase hover:brightness-105"
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
        className="rounded-2xl p-5 mb-6 border-b-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
        style={{ 
          backgroundColor: THEME.pink.bg, 
          borderColor: THEME.pink.shadow     
        }}
      >
        <h3 className="text-lg font-black mb-4 tracking-wide" style={{ color: THEME.pink.shadow }}>
          LIGAS
        </h3>
        
        <div className="flex items-center gap-4">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 border-2 relative bg-white"
              style={{ 
                borderColor: THEME.blue.main 
              }}
            >
              <Image    
                src="/liga.png" 
                alt="Liga Bronce" 
                fill
                className="object-contain p-2"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-sm" style={{ color: THEME.text.dark }}>Liga Actual</h4>
              <p className="text-xs font-medium leading-tight opacity-80" style={{ color: THEME.text.dim }}>
                Sube a <span className="font-bold" style={{ color: THEME.peach.shadow }}>Bronce</span> completando lecciones.
              </p>
            </div>
        </div>
      </div>

      <div className="h-10"></div>

    </aside>
  );
}