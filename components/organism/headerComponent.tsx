'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useHeader } from '@/hooks/compotents/useHeader';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeaderComponent() {
  const { onNavigate } = useHeader();
  const { isAuthenticated, logout } = useAuth(); 
  const router = useRouter();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleSwitchAccount = () => {
    router.push('/login');
  };

  const btnStyle = "flex items-center rounded-xl transition hover:bg-orange-100 hover:text-black font-bold text-gray-900 tracking-wide text-sm cursor-pointer w-full";

  return (
    <>
      <aside className="flex flex-col bg-[#f8f4eb] text-white w-60 h-screen p-2 fixed left-0 top-0">
        
        <div className="hidden md:flex items-center justify-center mb-2 mt-4">
          <Link href='/' className="flex flex-col items-center">
            <Image 
              className="mb-5" 
              src="/images/logos/Piglance.png" 
              alt="Piglance" 
              width={100} 
              height={100} 
              style={{ width: 'auto', height: 'auto' }} 
            />
          </Link>
        </div>

        <nav className="flex flex-col px-1 gap-2 w-ss">
          <Link href="/" className={btnStyle}>
            <Image 
            src="/images/header/home.png"
            alt="Inicio" 
            width={90} 
            height={90} /> 
            <span className="hidden md:block">Inicio</span>
          </Link>

          <Link href="/map" className={btnStyle}>
            <Image 
            src="/images/header/learn.png" 
            alt="Aprender" 
            width={90} 
            height={90} /> 
            <span className="hidden md:block">Aprender</span>
          </Link>  
        </nav>

        <div className="flex md:mt-auto gw-auto md:w-full md:block relative" ref={menuRef}>         

            {isAuthenticated && (
              <>
                <Link href="/store" className={btnStyle}>
                  <Image 
                  src="/images/header/shop.png" 
                  alt="Tienda" 
                  width={90} 
                  height={90} /> 
                  <span className="hidden md:block">Tienda</span>
                </Link>

                <button className={`${btnStyle} hidden md:flex`}>
                  <Image 
                  src="/images/header/notificaciones.png" 
                  alt="Notificaciones" 
                  width={90} 
                  height={90} />
                  <span>Notificaciones</span>
                </button>
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

            {showUserMenu && isAuthenticated && (
              <div className="absolute bottom-16 md:bottom-12 left-1/2 -translate-x-1/2 
              md:left-0 md:translate-x-0 w-48 bg-[#e1f5fe]/90 rounded-lg 
              shadow-xl border border-[#81d4fa] overflow-hidden z-50">

                <div className="py-1">
                  <button 
                    onClick={() => { onNavigate("profile"); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#71b8e0ff]/30"
                  >
                    Ver Perfil
                  </button>

                  <button 
                    onClick={handleSwitchAccount}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#71b8e0ff]/30"
                  >
                    Cambiar cuenta
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-[#c9998aff] font-bold hover:bg-[#71b8e0ff]/30"
                  >
                    Cerrar sesión
                  </button>
                  
                </div>
              </div>
            )}
        </div>


        <div className="hidden md:flex justify-center mt-2 pb-2">
          <span className="text-gray-900 text-xs">v1.0.0</span>
        </div>

      </aside>
      <div className="md:hidden h-16 w-full"></div> 
      <div className="hidden md:block w-60 flex-shrink-0"></div>
    </>
  );
}