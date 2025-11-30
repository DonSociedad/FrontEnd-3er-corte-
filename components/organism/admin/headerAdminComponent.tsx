'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useHeaderAdmin } from '@/hooks/admin/useHeaderAdmin'; // Asumo que este es el nombre de tu hook

const THEME = {
  bgMain: "#ebd1dbff",         
  
  peach: {
    main: "#c8f3f1ff",         
    shadow: "#6f8d48ff",        
    light: "#9e7d74ff",         
  },

  pink: {
    main: "#b8a7adff",
    shadow: "#856171ff",
    bg: "#645d60ff",           
  },

  gray: {
    main: "#a59696ff",
    shadow: "#5f707aff",
    light: "#e1f5fe",
  },

  text: {
    dark: "#c9ae98ff",         
    light: "#d89595ff",         
    dim: "#696664ff",          
  }
};

export default function AdminSidebar() {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    showUserMenu, 
    menuRef, 
    toggleMenu, 
    pathname,
    isActive
  } = useHeaderAdmin();

  const btnBase = "flex items-center rounded-xl transition-all duration-200 font-bold tracking-wide text-sm cursor-pointer w-full py-3 px-2 group";
  
  const getBtnClass = (path: string) => {
    const isCurrent = pathname === path || (path !== '/admin/dashboard' && pathname.startsWith(path));

    return isCurrent
      ? `${btnBase} bg-[#856171ff] text-white shadow-lg shadow-red-900/20` 
      : `${btnBase} text-gray-700 hover:bg-[#856171ff]/40 hover:text-white`;
  };

  return (
    <>
      <aside className="flex flex-col bg-[#696664ff]/30 text-white w-64 h-screen p-4 fixed left-0 top-0 z-50 shadow-xl border-r border-[#a59696ff">
        
        {/* LOGO */}
        <div className="hidden md:flex flex-col items-center justify-center mb-8 mt-4">
          <Link href='/admin/dashboard' className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <Image 
              className="mb-2 object-contain" 
              src="/images/logos/Piglance.png" 
              alt="Piglance Admin" 
              width={100} 
              height={100}
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
            <div className="w-20 flex justify-center">
                <Image 
                src="/images/icons/dashboard.png" 
                alt="dashboard" 
                width={90} 
                height={90} /> 
            </div>
            <span className="hidden md:block">Dashboard</span>
          </Link>

          <Link href="/admin/users" className={getBtnClass('/admin/users')}>
            <div className="w-20 flex justify-center">
                <Image 
                src="/images/icons/usuarios.png" 
                alt="Usuarios" 
                width={90} 
                height={90} /> 
            </div>
            <span className="hidden md:block">Usuarios</span>
          </Link>  

          {/* --- NUEVO LINK PRODUCTOS --- */}
          <Link href="/admin/products" className={getBtnClass('/admin/products')}>
            <div className="w-20 flex justify-center">
                <Image 
                src="/images/icons/productos.png" 
                alt="Tienda" 
                width={90} 
                height={90} /> 
            </div>
            <span className="hidden md:block">Productos</span>
          </Link>

          <Link href="/admin/lessons" className={getBtnClass('/admin/lessons')}> 
            {/* Nota: Ajusté el href a /admin/lessons para que coincida con lo que hablamos antes, 
                 si tu ruta es /admin/content cambialo aquí */}
            <div className="w-20 flex justify-center">
                <Image 
                src="/images/icons/lecciones.png" 
                alt="lecciones" 
                width={90} 
                height={90} /> 
            </div>
            <span className="hidden md:block">Lecciones</span>
          </Link>

        </nav>

        {/* PERFIL / MENU USUARIO */}
        <div className="flex flex-col gap-2 mt-auto relative" ref={menuRef}>         
            <button
              onClick={toggleMenu}
              className={`${btnBase} justify-center md:justify-start border border-transparent hover:border-gray-700 bg-[#b8a7adff]`}
            >
              <div className="w-20 flex justify-center">
                <Image 
                src="/images/icons/usuario.png" 
                alt="Perfil" 
                width={90} 
                height={90} /> 
              </div>
              <span className="hidden md:block ml-2">
                {isAuthenticated ? "Administrador" : "Login"}
              </span>
            </button>

            {showUserMenu && isAuthenticated && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 
              md:left-0 md:translate-x-0 w-full bg-[#696664ff] rounded-xl 
              shadow-2xl border border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
                <div className="py-1 divide-y divide-gray-800">
                    <div className="px-4 py-3">
                        <p className="text-[10px] text-[#d89595ff] uppercase tracking-wider">
                          Sesión actual
                        </p>
                        <p className="text-xs text-white font-mono truncate" title={user?.email}>
                            {user?.email}
                        </p>
                    </div>
                    <button 
                        onClick={() => { toggleMenu(); logout(); }}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-black font-bold hover:bg-gray-800 transition-colors"
                    >
                        Cerrar sesión
                    </button>
                </div>
              </div>
            )}
        </div>
      </aside>
      <div className="md:hidden h-16 w-full"></div> 
      <div className="hidden md:block w-64 flex-shrink-0"></div>
    </>
  );
}