export default function HeaderComponent() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-pink-100 text-gray-800 shadow-md">
      {/* Logo */}
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">Piglance</span>
                <img src="" alt="Logo Piglance " className="h-25 w-auto"/>
            </a>
            </div>

      <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:text-white hover:bg-amber-600 transition-colors">
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
          </button>
      </div>

      {/* Navegación */}
      <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
        <a href="" className="hover:text-pink-600">Inicio</a>
        <a href="user_manual" className="hover:text-pink-600">Cómo funciona</a>
        <a href="courses" className="hover:text-pink-600">Cursos</a>
        <a href="community" className="hover:text-pink-600">Comunidad</a>
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
    </nav>
    </header>
  );
}
