'use client';

import Image from "next/image";
import useProfile from '@/hooks/profile/useProfile';
import ProfileCard from '@/components/organism/profile/profileCardComponent';

export default function ProfilePage() {
  const { user, loading, error, equipItem } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <span className="text-pink-500 text-xl font-bold animate-pulse">Cargando perfil...</span>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-red-500 font-bold mb-4">Error: {error || 'Usuario no encontrado'}</p>
            <a href="/login" className="text-blue-500 underline">Volver a iniciar sesión</a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pink-100 flex flex-col">
        {/* Header simple similar al mockup */}
        <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
            {/* Monedas */}
            <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg transform -rotate-2">
                <Image
                src="/images/icons/moneda.png" 
                alt="Moneda" 
                width={90} 
                height={90} 
                className="object-contain drop-shadow-md"
                />
                <span> Moneda</span>
                <span>{user.coins || 0}</span>
            </div>
        </header>

        {/* Contenido Central */}
        <section className="flex-1 flex items-center justify-center p-4">
             <ProfileCard user={user} onEquip={equipItem} />
        </section>

    </main>
  );
}