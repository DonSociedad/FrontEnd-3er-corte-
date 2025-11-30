"use client";

import UserTable from "@/components/organism/admin/userTable";
import useAdminUsers from "@/hooks/admin/useAdminUsers";
import useAdminLessons from "@/hooks/admin/useAdminLessons";

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
            color="bg-white-600" 
            icon="/images/icons/usuariostotales.png"
        />
        
         {/* 3. Usar el dato real de lecciones */}
        <StatCard 
            title="Total Lecciones" 
            value={loadingLessons ? "..." : totalLessons.toString()} 
            color="bg-white-600" 
            icon="/images/icons/totallecciones.png"
        />
        
        <StatCard 
            title="Ventas Tienda" 
            value="450" 
            color="bg-white-600" 
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

// ... componente StatCard igual que antes
function StatCard({ title, value, color, icon }: { title: string; value: string; color: string; icon: string }) {
    return (
        <div className={`${color} rounded-2xl p-6 text-white shadow-xl shadow-gray-200 transform hover:-translate-y-1 transition-transform duration-300`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-medium opacity-90 uppercase tracking-wider">{title}</h3>
                    <p className="text-4xl font-bold mt-2">{value}</p>
                </div>
                <span className="text-3xl opacity-50">{icon}</span>
            </div>
        </div>
    )
}