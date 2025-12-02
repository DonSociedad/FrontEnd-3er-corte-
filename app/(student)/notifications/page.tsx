'use client';
import { useEffect, useState } from 'react';
import { getNotificationsService, respondRequestService } from '@/libs/friendsService';
import { useNotification } from '@/contexts/notificationContext';
import PigAvatar from '@/components/molecules/pig/pigAvatar';
import { IAvatarEquipped } from '@/interfaces/users/user';

type RequestType = {
    _id: string;
    sender: {
        _id: string;
        name: string;
        lastName: string;
        pig: { equipped: IAvatarEquipped };
    };
    createdAt: string;
};

export default function NotificationsPage() {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();

    const fetchNotifications = async () => {
        setLoading(true);
        const { data, error } = await getNotificationsService();
        if (error) {
            showNotification(error, 'error');
        }
        setRequests(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleResponse = async (requestId: string, accept: boolean) => {
        const { error } = await respondRequestService(requestId, accept);
        if (error) {
            showNotification(error, 'error');
        } else {
            showNotification(accept ? "Solicitud aceptada" : "Solicitud rechazada", accept ? 'success' : 'info');
            // Recargar lista
            fetchNotifications(); 
        }
    };

    return (
        <div className="min-h-screen bg-[#fff0f5]">
            
            <main className="max-w-4xl mx-auto p-6 md:p-10">
                <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-8 flex items-center gap-3">
                   <div className="bg-red-100 p-2 rounded-2xl">🔔</div> 
                   Notificaciones
                </h1>

                {loading ? (
                    <div className="text-center text-pink-400 font-bold py-10 animate-pulse">Cargando...</div>
                ) : requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border-2 border-pink-50">
                        <p className="text-6xl mb-4 grayscale opacity-50">📭</p>
                        <p className="text-gray-400 font-bold text-lg">No tienes notificaciones nuevas</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {requests.map((req) => (
                            <div key={req._id} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md">
                                
                                {/* Avatar del Solicitante */}
                                <div className="w-20 h-20 relative bg-pink-50 rounded-full border-2 border-pink-200 overflow-hidden flex-shrink-0">
                                    <div className="w-full h-full relative transform scale-125 translate-y-2">
                                         <PigAvatar config={req.sender.pig.equipped} className="w-full h-full" />
                                    </div>
                                </div>

                                {/* Texto */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-black text-gray-800">
                                        {req.sender.name} {req.sender.lastName}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Quiere ser tu amigo en Piglance 🐷
                                    </p>
                                    <span className="text-xs text-gray-400 mt-1 block">
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Botones */}
                                <div className="flex gap-3 w-full md:w-auto">
                                    <button 
                                        onClick={() => handleResponse(req._id, true)}
                                        className="flex-1 md:flex-none px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95"
                                    >
                                        Aceptar
                                    </button>
                                    <button 
                                        onClick={() => handleResponse(req._id, false)}
                                        className="flex-1 md:flex-none px-6 py-2 bg-red-100 hover:bg-red-200 text-red-500 font-bold rounded-xl transition-colors"
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}