'use client';

import Image from 'next/image';

import { useHeader } from '@/hooks/compotents/useHeader';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeaderComponent() {
  const { onNavigate } = useHeader();
  const { isAuthenticated, logout } = useAuth(); 
  const router = useRouter();

  return (
    <aside className="flex flex-col bg-gray-100 text-white w-60 h-screen p-2 fixed left-0 top-0">
      <div className="flex items-center justify-center mb-10 mt-10">
        <Link href='/' className="flex flex-col items-center">
          <Image 
            className="h-15 w-auto mb-4" 
            src="/Piglance.png" 
            alt="Piglance" 
            width={60} 
            height={60} />
        </Link>
      </div>

      <nav className="flex flex-col py-12 px-1 gap-2 w-ss">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
          <Image 
            src="/home.png" 
            alt="Inicio" 
            width={100} 
            height={100}
          /> 
          <span>Inicio</span>
        </Link>

        <Link
          href="/map"
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
          <Image src="/learn.png"
          alt= "aprender" 
          width={90} 
          height={90} /> 
          <span>Aprender</span>
        </Link>
      </nav>

      <div className="flex flex-col py-12 gap-2 w-ss mt-50">
        <button
          onClick={() => onNavigate("store")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
            <Image src="/shop.png"
            alt= "tienda" 
            width={100} 
            height={100} /> 
            <span>Tienda</span>
        </button>

          <button
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm"
        >
          <Image src="/perfil.png"
            alt= "perfil" 
            width={100} 
            height={100} /> 
            <span>Perfil</span>
        </button>

        <button className="flex items-center px-2 py-3 rounded-xl transition hover:bg-gray-600 hover:text-white font-bold text-gray-900 tracking-wide text-sm">
          <Image 
          src="/notificaciones.png" 
          alt= "notificaciones" 
          width={100} 
          height={100} />
          <span> Notificaciones</span>
        </button>

      </div>

      <div className="  flex justify-center">
        <span className="text-gray-400 text-sm">v1.0.0</span>
      </div>

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