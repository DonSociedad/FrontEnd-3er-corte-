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
    ? "bg-gradient-to-b from-cyan-50 via-teal-50 to-emerald-50 border-teal-100" 
    : "bg-[#f8f4eb]"; 

  const textColor = isAuthenticated ? "text-cyan-900" : "text-gray-900";

  const btnHover = isAuthenticated
    ? "hover:bg-cyan-200/50 hover:text-cyan-950" 
    : "hover:bg-orange-100 hover:text-black"; 

  const btnStyle = `flex items-center justify-center md:justify-start rounded-xl transition font-bold tracking-wide text-sm cursor-pointer w-full p-1 md:p-2 ${textColor} ${btnHover}`;

  return (
    <>

      <aside className={`
        fixed z-40 transition-all duration-500 ease-in-out shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-sm
        flex items-center justify-between
        
        /* Estilos Móvil */
        bottom-0 left-0 w-full h-20 flex-row px-4 border-t
        
        /* Estilos Desktop */
        md:flex-col md:top-0 md:h-screen md:w-60 md:p-2 md:items-stretch md:justify-start md:border-r md:border-t-0
        
        ${sidebarBg}
      `}>
        
        <div className="hidden md:flex items-center justify-center mb-2 mt-4 shrink-0">
          <Link href='/' className="flex flex-col items-center">
            <Image 
              className="mb-5 drop-shadow-sm" 
              src="/images/logos/Piglance.png" 
              alt="Piglance" 
              width={100} 
              height={100} 
              style={{ width: 'auto', height: 'auto' }} 
              priority
            />
          </Link>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 md:gap-2 w-full justify-evenly md:justify-start items-center md:items-stretch">
          
          <Link href="/" className={btnStyle}>
            <div className="w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                <Image 
                src="/images/header/home.png"
                alt="Inicio" 
                width={90} 
                height={90}
                className="object-contain"
                /> 
            </div>
            <span className="hidden md:block ml-2">Inicio</span>
          </Link>

          <Link href="/map" className={btnStyle}>
            <div className="w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                <Image 
                src="/images/header/learn.png" 
                alt="Aprender" 
                width={90} 
                height={90}
                className="object-contain"
                /> 
            </div>
            <span className="hidden md:block ml-2">Aprender</span>
          </Link>

        </nav>

        <div className="hidden md:block md:mt-auto"></div>
        
        <div className="relative md:w-full flex justify-center md:block" ref={menuRef}>         
          {isAuthenticated && (
              <>
                <Link href="/store" className={btnStyle}>
                  <div className="w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                      <Image 
                        src="/images/header/shop.png" 
                        alt="Tienda" 
                        width={90} 
                        height={90} 
                        className="object-contain"
                      /> 
                  </div>
                  <span className="hidden md:block ml-2">Tienda</span>
                </Link>

                <Link href="/community" className={btnStyle}>
                    <div className="w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                      <Image 
                        src="/images/icons/comunidad.png"  
                        alt="Comunidad" 
                        width={90} 
                        height={90} 
                        className="object-contain"
                      /> 
                    </div>
                  <span className="hidden md:block ml-2">Comunidad</span>
                </Link>

                <Link href="/notifications" className={`${btnStyle} hidden sm:flex`}>
                    <div className="w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                      <Image 
                        src="/images/header/notificaciones.png" 
                        alt="Notificaciones" 
                        width={90} 
                        height={90} 
                        className="object-contain"
                      />
                    </div>
                  <span className="hidden md:block ml-2">Notificaciones</span>
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
              className={btnStyle}
            >
              <div className="w-8 h-8 md:w-auto md:h-auto flex items-center justify-center">
                  <Image 
                    src="/images/header/perfil.png" 
                    alt="Perfil" 
                    width={90} 
                    height={90} 
                    className="object-contain"
                  /> 
              </div>
              <span className="hidden md:block ml-2">
                {isAuthenticated ? "Perfil" : "Iniciar Sesión"}
              </span>
            </button>

            {showUserMenu && isAuthenticated && (
              <div className="
                absolute bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-cyan-200 overflow-hidden z-50
                /* Posición Móvil: Arriba del botón (bottom-full) y alineado a la derecha */
                bottom-[110%] right-0 w-56
                /* Posición Desktop: Arriba, ancho completo */
                md:bottom-16 md:left-0 md:w-full
              ">

                <div className="py-1">
                  <button 
                    onClick={() => { onNavigate("profile"); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-3 text-sm text-cyan-900 hover:bg-cyan-50 font-medium"
                  >
                    Ver Perfil
                  </button>

                  <button 
                    onClick={() => {
                        logout(); 
                        setShowUserMenu(false); 
                        router.push('/login'); 
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-cyan-900 hover:bg-cyan-50 font-medium"
                  >
                    Cambiar cuenta
                  </button>
                  
                  <div className="border-t border-cyan-100 my-1"></div>
                  
                  <button 
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-3 text-sm text-red-500 font-bold hover:bg-red-50"
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

      <div className="md:hidden h-24 w-full shrink-0"></div> 
      <div className="hidden md:block w-60 shrink-0"></div>
    </>
  );
}