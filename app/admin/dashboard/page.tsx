"use client";

import UserTable from "@/components/organism/admin/userTable";
import useAdminUsers from "@/hooks/admin/useAdminUsers";
import useAdminLessons from "@/hooks/admin/useAdminLessons";

const THEME = {
  bgMain: "#ebd1dbff",         
  
  peach: {
    main: "#885e51ff",         
    shadow: "#c9998aff",        
    light: "#ffccbcff",         
  },

  pink: {
    main: "#f1c0d0ff",
    shadow: "#cf88a7ff",
    bg: "#fce4ec",           
  },

  text: {
    dark: "#717888ff",         
    light: "#d89595ff",         
    dim: "#837570ff",          
  }
};


export default function AdminDashboardPage() {
  const { totalUsers, isLoading: loadingUsers } = useAdminUsers();
  const { totalLessons, isLoading: loadingLessons } = useAdminLessons(); 

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Resumen general de la plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        <StatCard 
            title="Usuarios Totales" 
            value={loadingUsers ? "..." : totalUsers.toString()} 
            color="bg-[#c9998aff]" 
            icon="/images/icons/usuariostotales.png"
        />
        
        <StatCard 
            title="Total Lecciones" 
            value={loadingLessons ? "..." : totalLessons.toString()} 
            color="bg-[#856171ff]" 
            icon="/images/icons/totallecciones.png"
        />
        
        <StatCard 
            title="Ventas Tienda" 
            value="450" 
            color="bg-[#885e51ff]" 
            icon="/images/icons/ventas.png"
        />
      </div>

      <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Usuarios Recientes</h3>
          <UserTable />
      </div>
    </div>
  );
}

// --- MODIFICACIÓN AQUÍ ---
function StatCard({ title, value, color, icon }: { title: string; value: string; color: string; icon: string }) {
    return (
        <div className={`${color} rounded-2xl p-6 text-white shadow-xl shadow-gray-200 transform hover:-translate-y-1 transition-transform duration-300 overflow-hidden relative`}>
            {/* items-center: para que el texto se centre verticalmente con la imagen grande */}
            <div className="flex justify-between items-center z-10 relative">
                <div>
                    <h3 className="text-sm font-bold opacity-90 uppercase tracking-wider">{title}</h3>
                    <p className="text-5xl font-extrabold mt-2">{value}</p>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                    <img 
                        src={icon} 
                        alt={title} 
                        className="w-24 h-24 object-contain drop-shadow-md" 
                    />
                </div>
            </div>
        </div>
    )
}