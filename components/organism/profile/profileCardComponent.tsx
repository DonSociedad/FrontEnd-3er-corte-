'use client';

import { useState } from 'react';
import { IUserProfile } from '@/interfaces/users/user';
import PigAvatar from '@/components/molecules/pig/pigAvatar';
import StatItem from '@/components/molecules/profile/StatItem'; // Asumo que ya tienes este componente de antes
import AvatarEditor from './avatarEditorComponent';
import { useFriendship } from '@/hooks/community/useFriendship';

interface ProfileCardProps {
  user: IUserProfile;
  onEquip?: (cat: string, id: string) => void;
  isOwnProfile?: boolean;
}

export default function ProfileCard({ user, onEquip, isOwnProfile = false }: ProfileCardProps) {
  const [view, setView] = useState<'info' | 'customize'>('info');

  // Lógica de amistad: Solo se activa si NO es mi perfil
  const { status, sendRequest } = useFriendship(isOwnProfile ? '' : user.id);

  // Helper para renderizar el botón de amistad según el estado
  const renderFriendButton = () => {
    if (status === 'loading') {
        return <div className="w-full mt-4 py-3 text-center text-gray-400 text-sm animate-pulse">Cargando estado...</div>;
    }

    if (status === 'friends') {
        return (
            <div className="w-full mt-4 py-3 rounded-xl bg-teal-50 text-teal-600 font-bold text-center border-2 border-teal-100 flex items-center justify-center gap-2 shadow-sm">
                <span>✅</span> ¡Ya son amigos!
            </div>
        );
    }

    if (status === 'pending_sent') {
        return (
            <div className="w-full mt-4 py-3 rounded-xl bg-gray-50 text-gray-500 font-bold text-center border-2 border-gray-200 flex items-center justify-center gap-2">
                <span>🕓</span> Solicitud enviada
            </div>
        );
    }

    if (status === 'pending_received') {
        return (
            <div className="w-full mt-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold text-center border-2 border-orange-100 flex items-center justify-center gap-2">
                <span>🔔</span> Te envió solicitud (Revisa notificaciones)
            </div>
        );
    }
    
    // Estado 'none': Mostrar botón para agregar
    return (
        <button 
            onClick={sendRequest}
            className="group w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
            <span className="group-hover:scale-125 transition-transform">➕</span> Agregar Amigo
        </button>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl mx-auto bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-[3rem] shadow-sm border border-pink-100">
      
      {/* === COLUMNA IZQUIERDA: CERDO Y NOMBRE === */}
      <div className="flex flex-col items-center">
        {user.role === 'admin' && (
            <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
                PROFESOR ⭐
            </span>
        )}
        
        <h2 className="text-4xl font-black text-gray-800 mb-4 capitalize text-center">
            {user.name} {user.lastName}
        </h2>
        
        <div className="relative transition-all duration-500 hover:scale-105 group cursor-pointer">
            {/* Fondo decorativo detrás del cerdo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-pink-200 to-purple-100 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            
            <PigAvatar config={user.pig.equipped} />
            
            {/* Sombra de piso */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black/10 rounded-[100%] blur-md z-[-1]"></div>
        </div>
      </div>

      {/* === COLUMNA DERECHA: PANEL INTERACTIVO === */}
      <div className="bg-white rounded-3xl p-6 shadow-xl w-full md:w-[450px] min-h-[500px] flex flex-col border-b-8 border-gray-50 ring-1 ring-gray-100">
        
        {/* HEADER TABS (Solo visibles si es MI perfil) */}
        <div className="flex gap-6 border-b-2 border-gray-100 pb-2 mb-4">
            <button 
                onClick={() => setView('info')}
                className={`text-xl font-black pb-2 transition-colors flex-1 text-center ${
                    view === 'info' 
                    ? 'text-gray-800 border-b-4 border-pink-400' 
                    : 'text-gray-300 hover:text-gray-500'
                }`}
            >
                Información
            </button>
            
            {isOwnProfile && (
                <button 
                    onClick={() => setView('customize')}
                    className={`text-xl font-black pb-2 transition-colors flex-1 text-center ${
                        view === 'customize' 
                        ? 'text-gray-800 border-b-4 border-pink-400' 
                        : 'text-gray-300 hover:text-gray-500'
                    }`}
                >
                    Vestidor
                </button>
            )}
        </div>

        {/* CONTENIDO CAMBIANTE */}
        <div className="flex-1 flex flex-col">
            {view === 'info' ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full justify-between">
                    
                    {/* Lista de Estadísticas */}
                    <div className="space-y-4 mt-2">
                        <StatItem label="Lecciones Completadas" value={user.completedLessons || 0} />
                        <StatItem label="Amigos" value={user.friends || 0}  />
                        
                        {/* El inventario lo resaltamos un poco */}
                        <StatItem label="Colección de Objetos" value={user.pig.inventory.length} highlight />
                        
                        {/* Monedas solo visibles para mí */}
                        {isOwnProfile && (
                             <StatItem label="Mis Monedas" value={user.coins || 0} />
                        )}
                    </div>
                    
                    {/* BOTONES DE ACCIÓN (ABAJO) */}
                    <div className="mt-6">
                        {isOwnProfile ? (
                            <button 
                                onClick={() => setView('customize')}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-200 border-b-4 border-pink-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <span>👕</span> IR A VESTIDOR
                            </button>
                        ) : (
                            // Si NO es mi perfil, mostramos botones sociales
                            <div>
                                {renderFriendButton()}
                                <p className="mt-4 text-center text-xs text-gray-400 font-medium italic">
                                    Viendo perfil público
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            ) : (
                // VISTA DE PERSONALIZACIÓN (Solo si esOwnProfile=true)
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full">
                    {isOwnProfile && onEquip && (
                        <AvatarEditor pigData={user.pig} onEquip={onEquip} />
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}