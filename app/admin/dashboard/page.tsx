"use client";

import UserTable from "@/components/organism/admin/userTable";
import useAdminUsers from "@/hooks/admin/useAdminUsers";

export default function AdminDashboardPage() {
  // Consumimos el hook para obtener el número real de usuarios
  const { totalUsers, isLoading } = useAdminUsers();

  return (
    <div className="p-8 md:p-12">
      {/* Título de la sección */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Resumen general de la plataforma.
        </p>
      </div>

      {/* Grid de Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         
         {/* Tarjeta 1: Usuarios (Datos Reales) */}
         <StatCard 
            title="Usuarios Totales" 
            value={isLoading ? "..." : totalUsers.toString()} 
            color="bg-blue-600" 
            icon="👥"
         />
         
         {/* Tarjeta 2: Lecciones (Simulado por ahora) */}
         <StatCard 
            title="Lecciones Completadas" 
            value="856" 
            color="bg-green-600" 
            icon="✅"
         />
         
         {/* Tarjeta 3: Ventas (Simulado por ahora) */}
         <StatCard 
            title="Ventas Tienda" 
            value="450" 
            color="bg-purple-600" 
            icon="💰"
         />
      </div>

      {/* Tabla de Usuarios */}
      <UserTable />
    </div>
  );
}

// Sub-componente simple para las tarjetas (puedes moverlo a un archivo en 'molecules' si prefieres)
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