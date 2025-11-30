'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useHeaderAdmin } from '@/hooks/admin/useHeaderAdmin';

export default function AdminSidebar() {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    showUserMenu, 
    menuRef, 
    toggleMenu, 
    isActive 
  } = useHeaderAdmin();

  // Estilos base para modo oscuro
  const btnBase = "flex items-center rounded-xl transition-all duration-200 font-bold tracking-wide text-sm cursor-pointer w-full py-3 px-2 group";
  
  // Función para asignar clases según si está activo o no
  const getBtnClass = (path: string) => {
    return isActive(path)
      ? `${btnBase} bg-red-600 text-white shadow-lg shadow-red-900/20` // Activo
      : `${btnBase} text-gray-400 hover:bg-gray-800 hover:text-white`; // Inactivo
  };

  return (
    <>
      <aside className="flex flex-col bg-black text-white w-64 h-screen p-4 fixed left-0 top-0 z-50 shadow-xl border-r border-gray-800">
        
        {/* LOGO */}
        <div className="hidden md:flex flex-col items-center justify-center mb-8 mt-4">
          <Link href='/admin/dashboard' className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <Image 
              className="mb-2 object-contain" 
              src="/images/logos/Piglance.png" 
              alt="Piglance Admin" 
              width={90} 
              height={90}
              priority 
            />
            <span className="text-[10px] font-mono text-red-500 tracking-[0.2em] uppercase mt-1">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="flex flex-col gap-2 w-full flex-1 px-1">
          
          <Link href="/admin/dashboard" className={getBtnClass('/admin/dashboard')}>
            <div className="w-10 flex justify-center">
                <Image 
                  src="/images/header/home.png"
                  alt="Inicio" 
                  width={30} 
                  height={30} 
                /> 
            </div>
            <span className="hidden md:block">Dashboard</span>
          </Link>

          <Link href="/admin/users" className={getBtnClass('/admin/users')}>
            <div className="w-10 flex justify-center">
                <Image 
                  src="/images/header/perfil.png" 
                  alt="Usuarios" 
                  width={30} 
                  height={30}
                /> 
            </div>
            <span className="hidden md:block">Usuarios</span>
          </Link>  

          <Link href="/admin/lessons" className={getBtnClass('/admin/content')}>
             <div className="w-10 flex justify-center">
                <Image 
                  src="/images/header/learn.png" 
                  alt="Contenido" 
                  width={30} 
                  height={30}
                /> 
             </div>
            <span className="hidden md:block">Lecciones</span>
          </Link>

        </nav>

        {/* PERFIL / MENU USUARIO */}
        <div className="flex flex-col gap-2 mt-auto relative" ref={menuRef}>         

            {/* Botón que abre el menú */}
            <button
              onClick={toggleMenu}
              className={`${btnBase} justify-center md:justify-start border border-transparent hover:border-gray-700 bg-gray-900/50`}
            >
              <div className="w-10 flex justify-center">
                {/* Usamos una imagen genérica o el mismo icono de perfil */}
                <Image 
                    src="/images/header/perfil.png" 
                    alt="Perfil" 
                    width={30} 
                    height={30} 
                /> 
              </div>
              <span className="hidden md:block ml-2">
                {isAuthenticated ? "Cuenta Admin" : "Iniciar Sesión"}
              </span>
            </button>

            {/* Menú Desplegable */}
            {showUserMenu && isAuthenticated && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 
              md:left-0 md:translate-x-0 w-full bg-[#1a1a1a] rounded-xl 
              shadow-2xl border border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">

                <div className="py-1 divide-y divide-gray-800">
                    {/* Info del usuario (Email) */}
                    <div className="px-4 py-3">
                         <p className="text-[10px] text-gray-500 uppercase tracking-wider">Sesión actual</p>
                         <p className="text-xs text-white font-mono truncate" title={user?.email}>
                            {user?.email}
                         </p>
                    </div>

                    {/* Botón Logout */}
                    <button 
                        onClick={() => { toggleMenu(); logout(); }}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-400 font-bold hover:bg-gray-800 transition-colors"
                    >
                        Cerrar sesión
                    </button>
                  
                </div>
              </div>
            )}
        </div>

        {/* Versión */}
        <div className="hidden md:flex justify-center mt-4 pb-1 opacity-20 hover:opacity-50 transition-opacity">
          <span className="text-white text-[10px] font-mono">v1.0.0</span>
        </div>

      </aside>

      {/* Espaciadores para layout responsive */}
      <div className="md:hidden h-16 w-full"></div> 
      <div className="hidden md:block w-64 flex-shrink-0"></div>
    </>
  );
}