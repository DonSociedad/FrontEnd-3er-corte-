'use client';
import { useRouter } from 'next/navigation';

export function useHeader() {
  const router = useRouter();

  const routes: Record<string, string> = {
    workplace: '/workplace',
    profile: '/profile',
  };

  const onNavigate = (page: string) => {
    router.push(routes[page] ?? '/');
  };

  return { onNavigate, routes };
}