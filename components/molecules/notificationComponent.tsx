'use client';

import { useNotification } from '@/contexts/notificationContext';
import Image from 'next/image';;

export default function NotificationComponent() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    // Fondo general oscuro con blur para enfocar la atención
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/10 backdrop-blur-[2px] transition-all">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          role="alert"
          className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-[#FFF5F9] p-6 text-center shadow-[0_20px_40px_-10px_rgba(255,182,211,0.3)] border-2 border-[#FFE4F0] animate-[fadeIn_0.4s_ease-out_forwards]"
        >
          <div className="flex flex-col items-center relative z-10">
            
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-[#FFE4F0]">
              <span className="text-3xl filter drop-shadow-sm">
                <Image 
                  src= "/images/icons/piggy.png"
                  alt = "cerdo"
                  width={50}
                  height={50}
                />
              </span>
            </div>

            {/* Título */}
            <h3 className="mb-2 text-lg font-bold text-gray-800">
              {notification.type === 'error' ? '¡Atención!' : '¡Notificación!'}
            </h3>
            
            {/* Mensaje */}
            <p className="mb-6 text-sm font-medium text-gray-600 leading-relaxed px-2">
              {notification.message}
            </p>

            {/* Botón: Un rosa un poco más fuerte pero pastel para el contraste */}
            <button
              onClick={() => removeNotification(notification.id)}
              className="w-full rounded-xl bg-[#FFCBE3] hover:bg-[#FFB6D8] text-[#9D4D6F] py-3 text-sm font-bold transition-all active:scale-95 shadow-sm hover:shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}