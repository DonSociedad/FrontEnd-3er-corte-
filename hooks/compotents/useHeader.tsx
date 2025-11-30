'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useHeader() {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const routes: Record<string, string> = {
    workplace: '/workplace',
    profile: '/profile',
  };

  const onNavigate = (page: string) => {
    router.push(routes[page] ?? '/');
  };

  const handleSwitchAccount = () => {
    router.push('/login');
  };

  return { onNavigate, routes, showUserMenu, setShowUserMenu, menuRef, handleSwitchAccount };
}
