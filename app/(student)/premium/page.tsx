"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { subscribePremiumService } from "@/libs/usersService";
import { useNotification } from "@/contexts/notificationContext"; 
import HeaderComponent from "@/components/organism/headerComponent"; 

const CARD_STYLE = {
  monthly: {
    borderColor: "#81d4fa", // Azul
    shadowColor: "#71b8e0ff",
    bgColor: "#e1f5fe",
    btnColor: "#81d4fa"
  },
  yearly: {
    borderColor: "#fcd34d", // Dorado
    shadowColor: "#d97706",
    bgColor: "#fffbeb",
    btnColor: "#fcd34d"
  }
};

export default function PremiumPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    setLoading(true);
    // Simulación de espera
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { error } = await subscribePremiumService(plan);

    if (error) {
      showNotification(`Error: ${error}`, 'error');
      setLoading(false);
      return;
    }

    showNotification("¡Felicidades! Ahora eres Premium", 'success');
    router.push('/'); 
    router.refresh(); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-20">
      <div className="w-full max-w-5xl px-4 mt-4">
         <HeaderComponent />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-4 mt-10 animate-fade-in-up">
        
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-700 mb-4 tracking-tight">
                Acelera tu aprendizaje con <span className="text-amber-400">Plus</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Desbloquea todo el potencial de tu cerdo financiero.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* PLAN MENSUAL */}
            <div 
                className="rounded-3xl border-4 p-8 flex flex-col items-center relative transition-transform hover:-translate-y-2"
                style={{ 
                    backgroundColor: CARD_STYLE.monthly.bgColor,
                    borderColor: CARD_STYLE.monthly.borderColor,
                    boxShadow: `0 8px 0 0 ${CARD_STYLE.monthly.shadowColor}`
                }}
            >
                <h2 className="text-2xl font-bold text-slate-700 mb-2">Mensual</h2>
                <div className="text-4xl font-black text-slate-800 mb-6">
                    $15.000 <span className="text-lg text-slate-500 font-medium">/mes</span>
                </div>
                
                {/* AHORA TIENE LAS MISMAS CARACTERÍSTICAS QUE EL ANUAL */}
                <ul className="text-slate-600 space-y-3 mb-8 w-full text-center font-medium">
                    <li>👑 <span className="font-bold">Items Exclusivos</span> de Avatar</li>
                    <li>📈 Lecciones Avanzadas</li>
                    <li>✨ Insignia Dorada en Perfil</li>
                    <li>🚫 Sin anuncios</li>
                </ul>

                <button
                    disabled={loading}
                    onClick={() => handleSubscribe('monthly')}
                    className="w-full py-4 rounded-xl font-bold text-slate-800 uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none hover:brightness-105 disabled:opacity-50"
                    style={{ 
                        backgroundColor: CARD_STYLE.monthly.btnColor,
                        boxShadow: `0 4px 0 0 ${CARD_STYLE.monthly.shadowColor}`
                    }}
                >
                    {loading ? 'Procesando...' : 'Elegir Mensual'}
                </button>
            </div>

            {/* PLAN ANUAL */}
            <div 
                className="rounded-3xl border-4 p-8 flex flex-col items-center relative transition-transform hover:-translate-y-2 transform scale-105"
                style={{ 
                    backgroundColor: CARD_STYLE.yearly.bgColor,
                    borderColor: CARD_STYLE.yearly.borderColor,
                    boxShadow: `0 8px 0 0 ${CARD_STYLE.yearly.shadowColor}`
                }}
            >
                <div className="absolute -top-5 bg-amber-500 text-white font-bold px-4 py-1 rounded-full shadow-sm text-sm uppercase tracking-wide">
                    Mejor Valor
                </div>

                <h2 className="text-2xl font-bold text-amber-800 mb-2">Anual</h2>
                <div className="text-4xl font-black text-slate-800 mb-6">
                    $150.000 <span className="text-lg text-slate-500 font-medium">/año</span>
                </div>
                {/* Diferencia: Badge de ahorro */}
                <p className="text-amber-600 font-bold text-sm mb-4 bg-amber-100 px-3 py-1 rounded-lg">
                    Ahorras 2 meses
                </p>
                
                <ul className="text-slate-700 space-y-3 mb-8 w-full text-center font-medium">
                    <li>👑 <span className="font-bold">Items Exclusivos</span> de Avatar</li>
                    <li>📈 Lecciones Avanzadas</li>
                    <li>✨ Insignia Dorada en Perfil</li>
                    <li>🚫 Sin anuncios</li>
                </ul>

                <button
                    disabled={loading}
                    onClick={() => handleSubscribe('yearly')}
                    className="w-full py-4 rounded-xl font-bold text-amber-900 uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none hover:brightness-105 disabled:opacity-50"
                    style={{ 
                        backgroundColor: CARD_STYLE.yearly.btnColor,
                        boxShadow: `0 4px 0 0 ${CARD_STYLE.yearly.shadowColor}`
                    }}
                >
                    {loading ? 'Procesando...' : 'Elegir Anual'}
                </button>
            </div>

        </div>
        <button 
            onClick={() => router.back()}
            className="mt-12 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase text-sm tracking-wide"
        >
            No, gracias. Quiero seguir aprendiendo gratis.
        </button>
      </main>
    </div>
  );
}