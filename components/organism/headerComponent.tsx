// src/components/organism/headerComponent.tsx
'use client';

import { useHeader } from '@/hooks/compotents/useHeader';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

export default function HeaderComponent() {
  const { onNavigate } = useHeader();
  const { isAuthenticated, logout } = useAuth(); // Usamos el estado y la función logout
  const router = useRouter();

  // Wrapper para navegar (usando tu hook existente o router directo)
  const handleNav = (path: string) => {
    // Si onNavigate usa router.push internamente, está bien.
    // Si no, podrías usar router.push(path) aquí.
    onNavigate(path); 
  };

  return (
    <aside className="flex flex-col bg-[#0f172a] border-r border-gray-800 w-64 h-screen p-4 fixed left-0 top-0 z-20 hidden md:flex">
      <div className="flex items-center mb-8 px-4">
        <button onClick={() => handleNav('workplace')} className="flex items-center gap-2">
            {/* Ajusta el src de tu logo */}
          <img className="h-8 w-auto" src="/Piglance.png" alt="Piglance" />
        </button>
      </div>

      <nav className="flex flex-col gap-2 w-full">
        <button
          onClick={() => handleNav('workplace')}
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-800/50 font-bold text-gray-400 hover:text-white tracking-wide text-sm uppercase transition-colors"
        >
          <span className="text-2xl">🏠</span> <span>Aprender</span>
        </button>

        {/* SOLO MOSTRAR SI ESTÁ AUTENTICADO */}
        {isAuthenticated && (
          <>
            <button
              onClick={() => handleNav('profile')}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-800/50 font-bold text-gray-400 hover:text-white tracking-wide text-sm uppercase transition-colors"
            >
              <span className="text-2xl">👤</span> <span>Perfil</span>
            </button>
            
             <button
              onClick={() => router.push('/creator-studio')}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-800/50 font-bold text-gray-400 hover:text-white tracking-wide text-sm uppercase transition-colors"
            >
              <span className="text-2xl">🎨</span> <span>Personaje</span>
            </button>
          </>
        )}
        
        {/* Opción de Tienda o Misiones visible para todos o solo users? 
            Generalmente visible, pero funcional solo para users. Lo dejo opcional.
        */}
      </nav>

      {/* FOOTER DEL HEADER */}
      <div className="mt-auto flex justify-center pb-4">
        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="text-sm font-bold text-gray-400 hover:text-red-400 transition uppercase tracking-widest"
          >
            Cerrar sesión
          </button>
        ) : (
            // Opcional: Botón de ingreso si está en móvil donde no se ve la barra derecha
            <button 
                onClick={() => router.push('/login')}
                className="md:hidden text-sm font-bold text-blue-400 hover:text-blue-300 transition uppercase tracking-widest"
            >
                Ingresar
            </button>
        )}
      </div>
    </aside>
  );
}