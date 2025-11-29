'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation'; 
import { ArrowLeftIcon } from "lucide-react";
import useProfile from '@/hooks/profile/useProfile';
import ProfileCard from '@/components/organism/profile/profileCardComponent';

export default function ProfilePage() {
  const { user, loading, error, equipItem } = useProfile();
  const router = useRouter(); 

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <span className="text-pink-500 text-xl font-bold animate-pulse">
            Cargando perfil...
        </span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
            <p className="text-red-500 font-bold mb-4 text-lg">
                Error: {error || 'Usuario no encontrado'}
            </p>
            <button 
                onClick={() => router.push('/login')} 
                className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Volver a iniciar sesión
            </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pink-100 flex flex-col">
      
        <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
          
            <button 
                onClick={() => router.back()} 
                className="flex items-center  gap-2 text-gray-500 hover:text-[#f0b9a8] transition-colors font-bold group"
            >
                <ArrowLeftIcon className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="text-lg">
                  Volver
                </span>
            </button>

            {/* Contador de Monedas (Alineado a la derecha) */}
            <div className="bg-red-500 text-white px-5 py-2 rounded-2xl font-bold flex items-center gap-3 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
                <div className="relative w-8 h-8">
                    <Image
                        src="/images/icons/moneda.png" 
                        alt="Moneda" 
                        fill
                        className="object-contain drop-shadow-md"
                    />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[10px] opacity-90 uppercase tracking-wider">Monedas</span>
                    <span className="text-xl">{user.coins || 0}</span>
                </div>
            </div>
        </header>

        {/* Contenido Central: Profile Card */}
        <section className="flex-1 flex items-center justify-center p-4 w-full">
            <div className="w-full max-w-4xl">
                <ProfileCard user={user} onEquip={equipItem} />
            </div>
        </section>

    </main>
  );
}