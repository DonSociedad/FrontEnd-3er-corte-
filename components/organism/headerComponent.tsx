'use client';

import Image from 'next/image';

import { useHeader } from '@/hooks/compotents/useHeader';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

export default function HeaderComponent() {
  const { onNavigate } = useHeader();
  const { isAuthenticated, logout } = useAuth(); // Usamos el estado y la función logout
  const router = useRouter();

  return (
    <aside className="flex flex-col bg-gray-100 text-white w-64 h-screen p-6 fixed left-0 top-0">
      <div className="flex items-center justify-center mb-10">
        <button onClick={() => onNavigate("workplace")} className="flex flex-col items-center">
          <Image className="h-12 w-auto mb-2" src="/Piglance.png" alt="Piglance" width={60} height={60} />
        </button>
      </div>

      <nav className="flex flex-col gap-2 w-full">
        <button
          onClick={() => onNavigate("workplace")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
          <span className="text-2xl">🏠</span> <span>Aprender</span>
        </button>

        <button
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
          <span className="text-2xl">👤</span> <span>PERFIL</span>
        </button>
        <button
          onClick={() => onNavigate("store")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
          <span className="text-2xl">👤</span> <span>TIENDA</span>
        </button>
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