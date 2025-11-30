import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/authContext';
import { usePathname } from 'next/navigation';

export const useHeaderAdmin = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  // Función para saber si el botón debe estar pintado (Ruta activa)
  const isActive = (path: string) => pathname === path;

  return {
    user,
    isAuthenticated,
    logout,
    showUserMenu,
    menuRef,
    toggleMenu,
    isActive
  };
};