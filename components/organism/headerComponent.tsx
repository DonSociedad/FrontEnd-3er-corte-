import ButtonComponent from "../atoms/buttonComponents";

export default function HeaderComponent() {
return (
  <header className="flex items-center justify-between px-6 py-4 bg-pink-100 text-gray-800 shadow-md">
    {/* Contenedor general */}
    <nav className="flex items-center justify-between w-full">
      
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="-m-1.5 p-1.5 flex items-center">
          <span className="sr-only">Piglance</span>
          {/* Logo de Piglance, se encuentra en la carpeta public donde se deben de poner las imagenes */}
          <img className="h-50 w-auto" src="/Piglance.png" alt="Piglance" />
          
        </a>
      </div>
        
      {/* Nav */}
      <div className="hidden lg:flex space-x-6 text-base font-medium">
        <a href="/" className="hover:text-pink-600">Inicio</a>
        <a href="/user_manual" className="hover:text-pink-600">Cómo funciona</a>
        <a href="/courses" className="hover:text-pink-600">Cursos</a>
        <a href="/community" className="hover:text-pink-600">Comunidad</a>
      </div>

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
          <a href= "perfil" className="text-xs mt-1 text-gray-600">Cuenta</a>
        </div>

        <a href="register">
            <ButtonComponent type={1} content="Registrarse" />
        </a>
      </div>
    </nav>
    </header>
  );
}
