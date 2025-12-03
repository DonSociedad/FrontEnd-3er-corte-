'use client';

import { ProfileCardProps } from '@/interfaces/interaction/profileCardProps';
import PigAvatar from '@/components/molecules/pig/pigAvatar';
import StatItem from '@/components/molecules/profile/StatItem'; 
import AvatarEditor from './avatarEditorComponent';
import { useFriendship } from '@/hooks/community/useFriendship';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ExtendedProfileCardProps extends ProfileCardProps {
    onUpdateProfile?: (name: string, lastName: string) => Promise<boolean>;
    isUpdating?: boolean;
}

export default function ProfileCard({ user, onEquip, isOwnProfile = false, onUpdateProfile, isUpdating }: ExtendedProfileCardProps) {
    const [view, setView] = useState<'info' | 'customize'>('info');
    
    // Estados para la edición
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', lastName: '' });

    const { status, sendRequest } = useFriendship(isOwnProfile ? '' : user?.id || '');

    // Inicializar el formulario cuando llega el usuario
    useEffect(() => {
        if (user) {
            setEditForm({ name: user.name, lastName: user.lastName });
        }
    }, [user]);

    if (!user) {
        return <div className="p-10 text-center animate-pulse">Cargando perfil...</div>;
    }

    const handleSaveProfile = async () => {
        if (!onUpdateProfile) return;
        if (!editForm.name.trim() || !editForm.lastName.trim()) return;

        const success = await onUpdateProfile(editForm.name, editForm.lastName);
        if (success) {
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditForm({ name: user.name, lastName: user.lastName });
        setIsEditing(false);
    };

    // Helper para renderizar botón de amistad (sin cambios)
    const renderFriendButton = () => {
        switch (status) {
            case 'loading': return <div className="w-full mt-4 py-3 text-center text-gray-400 text-sm animate-pulse">Cargando...</div>;
            case 'friends': return <div className="w-full mt-4 py-3 rounded-xl bg-teal-50 text-teal-600 font-bold text-center border-2 border-teal-100 flex items-center justify-center gap-2 shadow-sm"><span><Image src= "/images/icons/amigos.png" alt="ok" width={24} height={24}/></span> ¡Ya son amigos!</div>;
            case 'pending_sent': return <div className="w-full mt-4 py-3 rounded-xl bg-gray-50 text-gray-500 font-bold text-center border-2 border-gray-200 flex items-center justify-center gap-2"><span><Image src= "/images/icons/enviada.png" alt="sent" width={24} height={24}/></span> Solicitud enviada</div>;
            case 'pending_received': return <div className="w-full mt-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold text-center border-2 border-orange-100 flex items-center justify-center gap-2"><span><Image src= "/images/icons/pendiente.png" alt="wait" width={24} height={24}/></span> Solicitud pendiente</div>;
            default: return (
                <button onClick={sendRequest} className="group w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2">
                    <span className="group-hover:scale-125 transition-transform"><Image src= "/images/icons/agregar.png" alt="add" width={24} height={24}/></span> Agregar Amigo
                </button>
            );
        }
    };

    return (
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full max-w-5xl mx-auto bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-[3rem] shadow-sm border border-pink-100 mt-6">

            {/* === COLUMNA IZQUIERDA: CERDO Y NOMBRE === */}
            <div className="flex flex-col items-center z-0 w-full md:w-auto">
                {user.role === 'admin' && (
                    <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm flex items-center gap-1">
                        <Image src="/images/icons/cargando.png" alt="profesor" width={16} height={16} /> PROFESOR 
                    </span>
                )}
                
                {/* Lógica de Edición de Nombre */}
                {isOwnProfile && isEditing ? (
                    <div className="flex flex-col gap-3 mb-4 w-full max-w-xs animate-in fade-in zoom-in duration-200">
                        <input 
                            type="text" 
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                            placeholder="Nombre"
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 font-bold text-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-center"
                        />
                        <input 
                            type="text" 
                            value={editForm.lastName}
                            onChange={(e) => setEditForm(prev => ({...prev, lastName: e.target.value}))}
                            placeholder="Apellido"
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 font-bold text-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-center"
                        />
                        {/* ... inputs de nombre y apellido arriba ... */}
                        <div className="flex gap-2 justify-center mt-2">
                            <button 
                                onClick={handleCancelEdit}
                                disabled={isUpdating}
                                className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors text-sm"
                            >
                                Cancelar
                            </button>
                            
                            {/* BOTÓN GUARDAR ESTILO VESTIDOR */}
                            <button 
                                onClick={handleSaveProfile}
                                disabled={isUpdating}
                                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-200 border-b-4 border-pink-700 active:border-b-0 active:translate-y-1 transition-all text-sm flex items-center gap-2"
                            >
                                {isUpdating ? (
                                    <>
                                        {/* Spinner simple css si está cargando */}
                                        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Guardando...
                                    </>
                                ) : (
                                    'Guardar'
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 mb-4 group relative">
                        <h2 className="text-4xl font-black text-gray-800 capitalize text-center leading-tight">
                            {user.name} <br className="md:hidden"/> {user.lastName}
                        </h2>
                        
                        {/* Botón Editar (Lápiz) solo visible si es mi perfil */}
                        {isOwnProfile && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="absolute -right-8 top-1 md:static md:opacity-0 md:group-hover:opacity-100 p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-xl transition-all"
                                title="Editar nombre"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                            </button>
                        )}
                    </div>
                )}
                
                <div className="relative transition-all duration-500 hover:scale-105 group cursor-pointer mt-2">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity ${
                        user.isPremium ? 'bg-gradient-to-tr from-yellow-200 via-amber-200 to-yellow-100' : 'bg-gradient-to-tr from-pink-200 to-purple-100'
                    }`}></div>
                    
                    <PigAvatar config={user.pig.equipped} />
                    
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black/10 rounded-[100%] blur-md z-[-1]"></div>
                </div>
            </div>

            {/* === COLUMNA DERECHA: PANEL INTERACTIVO (Sin cambios mayores) === */}
            <div className="bg-white rounded-3xl p-6 shadow-xl w-full md:w-[450px] min-h-[500px] flex flex-col border-b-8 border-gray-50 ring-1 ring-gray-100 z-0">
                <div className="flex gap-6 border-b-2 border-gray-100 pb-2 mb-4">
                    <button 
                        onClick={() => setView('info')}
                        className={`text-xl font-black pb-2 transition-colors flex-1 text-center ${view === 'info' ? 'text-gray-800 border-b-4 border-pink-400' : 'text-gray-300 hover:text-gray-500'}`}
                    >
                        Información
                    </button>
                    
                    {isOwnProfile && (
                        <button 
                            onClick={() => setView('customize')}
                            className={`text-xl font-black pb-2 transition-colors flex-1 text-center ${view === 'customize' ? 'text-gray-800 border-b-4 border-pink-400' : 'text-gray-300 hover:text-gray-500'}`}
                        >
                            Vestidor
                        </button>
                    )}
                </div>

                <div className="flex-1 flex flex-col">
                    {view === 'info' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col h-full justify-between">
                            <div className="space-y-4 mt-2">
                                <StatItem label="Lecciones Completadas" value={user.completedLessons || 0} />
                                <StatItem label="Amigos" value={user.friends || 0}  />
                                <StatItem label="Colección de Objetos" value={user.pig?.inventory?.length || 0} highlight />
                            </div>
                            
                            <div className="mt-6">
                                {isOwnProfile ? (
                                    <button 
                                        onClick={() => setView('customize')}
                                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-pink-200 border-b-4 border-pink-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                                    >
                                        <span><Image src= "/images/icons/vestidor.png" alt = "vestidor" width={24} height={24} /></span> IR A VESTIDOR
                                    </button>
                                ) : (
                                    <div>
                                        {renderFriendButton()}
                                        <p className="mt-4 text-center text-xs text-gray-400 font-medium italic">Viendo perfil público</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full">
                            {isOwnProfile && onEquip && user.pig && (
                                <AvatarEditor pigData={user.pig} onEquip={onEquip} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}