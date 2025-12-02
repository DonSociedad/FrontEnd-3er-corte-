'use client';

import Image from 'next/image';
import { useHeader } from '@/hooks/compotents/useHeader';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeaderComponent() {
  const { onNavigate, showUserMenu, setShowUserMenu, menuRef, handleSwitchAccount } = useHeader();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const sidebarBg = isAuthenticated 
    ? "bg-gradient-to-b from-cyan-50 via-teal-50 to-emerald-50 border-r border-teal-100" 
    : "bg-[#f8f4eb]"; 

  const textColor = isAuthenticated
    ? "text-cyan-900" 
    : "text-gray-900";

  const btnHover = isAuthenticated
    ? "hover:bg-cyan-200/50 hover:text-cyan-950" 
    : "hover:bg-orange-100 hover:text-black"; 

  const btnStyle = `flex items-center rounded-xl transition font-bold tracking-wide text-sm cursor-pointer w-full ${textColor} ${btnHover}`;

  return (
    <>
      <aside className={`flex flex-col ${sidebarBg} w-60 h-screen p-2 fixed left-0 top-0 transition-colors duration-500 ease-in-out z-40 shadow-sm`}>
        
        {/* LOGO */}
        <div className="hidden md:flex items-center justify-center mb-2 mt-4">
          <Link href='/' className="flex flex-col items-center">
            <Image 
              className="mb-5 drop-shadow-sm" 
              src="/images/logos/Piglance.png" 
              alt="Piglance" 
              width={100} 
              height={100} 
              style={{ width: 'auto', height: 'auto' }} 
            />
          </Link>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="flex flex-col px-1 gap-2 w-ss">
          <Link href="/" className={btnStyle}>
            <Image 
              src="/images/header/home.png"
              alt="Inicio" 
              width={90} 
              height={90} 
            /> 
            <span className="hidden md:block">Inicio</span>
          </Link>

          <Link href="/map" className={btnStyle}>
            <Image 
              src="/images/header/learn.png" 
              alt="Aprender" 
              width={90} 
              height={90} 
            /> 
            <span className="hidden md:block">Aprender</span>
          </Link>

          {/* === NUEVO BOTÓN COMUNIDAD === */}
          <Link href="/community" className={btnStyle}>
            <Image 
              src="/images/header/learn.png"  //FALTA IMAGEN
              alt="Comunidad" 
              width={90} 
              height={90} 
            /> 
            <span className="hidden md:block">Comunidad</span>
          </Link>
        </nav>

        {/* SECCIÓN INFERIOR (PERFIL Y EXTRAS) */}
        <div className="flex md:mt-auto gw-auto md:w-full md:block relative" ref={menuRef}>         

            {isAuthenticated && (
              <>
                <Link href="/store" className={btnStyle}>
                  <Image 
                    src="/images/header/shop.png" 
                    alt="Tienda" 
                    width={90} 
                    height={90} 
                  /> 
                  <span className="hidden md:block">Tienda</span>
                </Link>

                <Link href="/notifications" className={btnStyle}>
                  <Image 
                    src="/images/header/notificaciones.png" 
                    alt="Notificaciones" 
                    width={90} 
                    height={90} 
                  />
                  <span>Notificaciones</span>
                </Link>
              </>
            )}

            <button
              onClick={() => {
                if (isAuthenticated) {
                  setShowUserMenu(!showUserMenu);
                } else {
                  router.push('/login');
                }
              }}
              className={`${btnStyle} justify-center md:justify-start`}
            >
              <Image 
                src="/images/header/perfil.png" 
                alt="Perfil" 
                width={90} 
                height={90} 
              /> 
              <span className="hidden md:block">
                {isAuthenticated ? "Perfil" : "Iniciar Sesión"}
              </span>
            </button>

            {/* Menú desplegable */}
            {showUserMenu && isAuthenticated && (
              <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 
              md:left-0 md:translate-x-0 w-48 bg-white/95 backdrop-blur-sm rounded-lg 
              shadow-xl border border-cyan-200 overflow-hidden z-50">

                <div className="py-1">
                  <button 
                    onClick={() => { onNavigate("profile"); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-cyan-900 hover:bg-cyan-50 font-medium"
                  >
                    Ver Perfil
                  </button>

                  <button 
                    onClick={handleSwitchAccount}
                    className="block w-full text-left px-4 py-2 text-sm text-cyan-900 hover:bg-cyan-50 font-medium"
                  >
                    Cambiar cuenta
                  </button>

                  <div className="border-t border-cyan-100 my-1"></div>
                  <button 
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 font-bold hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                  
                </div>
              </div>
            )}
        </div>

        <div className="hidden md:flex justify-center mt-2 pb-2">
          <span className={`text-xs opacity-60 ${textColor}`}>v1.0.0</span>
        </div>

      </aside>
      
      {/* Espaciadores para layout responsive */}
      <div className="md:hidden h-16 w-full"></div> 
      <div className="hidden md:block w-60 flex-shrink-0"></div>
    </>
  );
}