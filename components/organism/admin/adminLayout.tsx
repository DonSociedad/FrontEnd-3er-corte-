import Link from "next/link";

import { useAuth } from "@/contexts/authContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-6 fixed h-full">
        <div className="mb-10">
            {/* Logo o Título */}
            <h1 className="text-3xl font-bold text-red-500">Piglance</h1>
        </div>

        <nav className="flex-1 space-y-4">
          <AdminLink href="/admin/dashboard" label="Stats" active />
          <AdminLink href="/admin/users" label="Usuarios" />
          <AdminLink href="/admin/content" label="Lecciones" />
          <AdminLink href="/admin/store" label="Tienda" />
        </nav>

        <button 
            onClick={logout}
            className="mt-auto text-gray-400 hover:text-white transition-colors text-left"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

// Sub-componente átomo para los links del sidebar
function AdminLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
    return (
        <Link 
            href={href} 
            className={`block text-xl font-bold py-2 px-4 rounded-xl transition-all ${
                active ? 'bg-red-500 text-white' : 'text-gray-400 hover:bg-gray-800'
            }`}
        >
            {label}
        </Link>
    )
}