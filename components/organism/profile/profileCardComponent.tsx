import { useState } from 'react';
import { IUserProfile } from '@/interfaces/users/user';
import PigAvatar from '@/components/molecules/pig/pigAvatar';
import StatItem from '@/components/molecules/profile/StatItem';
import AvatarEditor from './avatarEditorComponent';

interface ProfileCardProps {
  user: IUserProfile;
  onEquip: (cat: string, id: string) => void; // Recibimos la función del hook
}

export default function ProfileCard({ user, onEquip }: ProfileCardProps) {
  const [view, setView] = useState<'info' | 'customize'>('info');

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl mx-auto">
      
      {/* IZQUIERDA: CERDO */}
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-black text-gray-900 mb-2">{user.name}</h2>
        <div className="relative transition-all duration-500 hover:scale-105">
            <PigAvatar config={user.pig.equipped} />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-6 bg-black/10 rounded-[100%] blur-sm z-[-1]"></div>
        </div>
      </div>

      {/* DERECHA: PANEL INTERACTIVO */}
      <div className="bg-white rounded-3xl p-6 shadow-xl w-full md:w-[420px] min-h-[450px] flex flex-col border-b-8 border-gray-100">
        
        {/* HEADER TABS */}
        <div className="flex gap-6 border-b-2 border-gray-100 pb-2 mb-4">
            <button 
                onClick={() => setView('info')}
                className={`text-2xl font-black pb-2 transition-colors ${
                    view === 'info' 
                    ? 'text-gray-900 border-b-4 border-red-500' 
                    : 'text-gray-300 hover:text-gray-500'
                }`}
            >
                info
            </button>
            <button 
                onClick={() => setView('customize')}
                className={`text-2xl font-black pb-2 transition-colors ${
                    view === 'customize' 
                    ? 'text-gray-900 border-b-4 border-red-500' 
                    : 'text-gray-300 hover:text-gray-500'
                }`}
            >
                personalizar
            </button>
        </div>

        {/* CONTENIDO CAMBIANTE */}
        <div className="flex-1">
            {view === 'info' ? (
                <div className="animate-fade-in">
                    <StatItem label="Lecciones Completadas" value={user.completedLessons || 0} />
                    <StatItem label="Amigos" value={user.friends || 0} />
                    <StatItem label="Artículos obtenidos" value={user.pig.inventory.length} highlight />
                    
                    {/* Botón grande para ir a personalizar desde info */}
                    <button 
                        onClick={() => setView('customize')}
                        className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all"
                    >
                        IR A VESTIDOR 👕
                    </button>
                </div>
            ) : (
                <div className="animate-fade-in h-full">
                    {/* Pasamos la data y la función al editor */}
                    <AvatarEditor pigData={user.pig} onEquip={onEquip} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}