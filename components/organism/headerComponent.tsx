'use client';
import { useHeader } from '@/hooks/useHeader';
export default function HeaderComponent() {
  const { onNavigate } = useHeader();

  return (
    <aside className="flex flex-col bg-gray-800 text-white w-64 h-screen p-6 fixed left-0 top-0">
      <div className="flex items-center justify-center mb-10">
        <button onClick={() => onNavigate('workplace')} className="flex flex-col items-center">
          <img className="h-12 w-auto mb-2" src="/Piglance.png" alt="Piglance" />
        </button>
      </div>

      <nav className="flex flex-col gap-4 w-full">
        <button
          onClick={() => onNavigate('workplace')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 font-bold text-white tracking-wide text-sm"
        >
          <span className="text-2xl">🏠</span> <span>APRENDER</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 font-bold text-white tracking-wide text-sm"
        >
          <span className="text-2xl">👤</span> <span>PERFIL</span>
        </button>
      </nav>

      <div className="mt-auto flex justify-center">
        <button className="text-sm text-gray-400 hover:text-red-400 transition">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}