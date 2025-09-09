export default function HeaderComponent() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-pink-100 text-gray-800 shadow-md">
      {/* Logo */}
      <div className="flex flex-col items-start">
        <div className="font-bold text-2xl">🐷 Porkoin</div>
      </div>

      {/* Navegación */}
      <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
        <a href="#" className="hover:text-pink-600">Inicio</a>
        <a href="#" className="hover:text-pink-600">Cómo funciona</a>
        <a href="#" className="hover:text-pink-600">Cursos</a>
        <a href="#" className="hover:text-pink-600">Comunidad</a>
      </nav>

      {/* Acciones con texto */}
      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-pink-100">🔍</button>
          <span className="text-xs mt-1 text-gray-600">Búsqueda</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-pink-100">🔔</button>
          <span className="text-xs mt-1 text-gray-600">Notificaciones</span>
        </div>

        <div className="flex flex-col items-center">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-pink-100">👤</button>
          <span className="text-xs mt-1 text-gray-600">Cuenta</span>
        </div>
      </div>
    </header>
  );
}
