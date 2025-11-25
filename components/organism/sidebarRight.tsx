// src/components/organism/sidebarRight.tsx
"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function SidebarRight() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <aside className="hidden lg:flex flex-col w-96 p-6 fixed right-0 top-0 h-screen overflow-y-auto border-l border-gray-800 bg-[#0f172a]">
      
      {/* --- ESTADO: USUARIO NO REGISTRADO (GUEST) --- */}
      {!isAuthenticated && (
        <div className="border border-gray-700 rounded-2xl p-5 mb-6 bg-gray-900/50">
          <h3 className="text-xl font-bold text-white mb-2">
            ¡Crea un perfil para guardar tu progreso!
          </h3>
          <p className="text-gray-400 mb-6 text-sm">
            No pierdas tu racha ni tus lecciones completadas.
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/register")}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-400 text-slate-900 font-bold transition-colors shadow-[0_4px_0_0_#15803d] active:shadow-none active:translate-y-1"
            >
              CREAR PERFIL
            </button>
            
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3 rounded-xl bg-[#0f172a] border-2 border-gray-700 text-blue-400 font-bold hover:bg-gray-800 transition-colors shadow-[0_4px_0_0_#374151] active:shadow-none active:translate-y-1 uppercase"
            >
              Ingresar
            </button>
          </div>
        </div>
      )}

      {/* --- ESTADO: USUARIO LOGUEADO --- */}
      {isAuthenticated && (
        <div className="border border-gray-700 rounded-2xl p-5 mb-6 bg-gray-900/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Personaliza tu experiencia</h3>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            {/* Placeholder visual del avatar o icono */}
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-4xl">
              🎨
            </div>
            
            <p className="text-gray-400 text-center text-sm">
              ¡Visita el estudio y crea tu propio personaje financiero!
            </p>

            <button
              onClick={() => router.push("/creator-studio")}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-[0_4px_0_0_#6b21a8] active:shadow-none active:translate-y-1 uppercase"
            >
              Ir al Estudio
            </button>
          </div>
        </div>
      )}

      {/* --- SECCIONES COMUNES (LIGAS, RANKING, ETC) --- */}
      <div className="border border-gray-700 rounded-2xl p-5 bg-gray-900/50">
        <h3 className="text-lg font-bold text-white mb-4">Ligas</h3>
        <div className="flex items-center gap-4 text-gray-400">
          <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
            🛡️
          </div>
          <p className="text-sm">Completa más lecciones para entrar a la liga de Bronce.</p>
        </div>
      </div>

    </aside>
  );
}