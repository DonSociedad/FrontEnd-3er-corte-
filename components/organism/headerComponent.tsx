export default function HeaderComponent() {
  return (
    <aside className="flex flex-col bg-gray-800 text-white w-64 h-screen p-6 fixed left-0 top-0">
      {/* LOGO */}
      <div className="flex items-center justify-center mb-10">
        <a href="/logged" className="flex flex-col items-center">
          <img className="h-12 w-auto mb-2" src="/Piglance.png" alt="Piglance" />
        </a>
      </div>

      {/* NAV PRINCIPAL */}
      <div className="flex flex-col flex-1 justify-start items-center">
        <nav className="flex flex-col gap-4 w-full">
          {/* Ejemplo de item seleccionado */}
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 font-bold text-white tracking-wide text-sm "
          >
            <span className="text-2xl">🏠</span>
            <span className="">
              APRENDER
            </span>
          </a>


          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 font-bold text-white tracking-wide text-sm "
          >
            <span className="text-2xl">🎯</span>
            <span className="">
              DESAFÍOS
            </span>
          </a>


          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 font-bold text-white tracking-wide text-sm "
          >
            <span className="text-2xl">👤</span>
            <span className="">
              PERFIL
            </span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-gray-600 font-bold text-white tracking-wide text-sm "
          >
            <span className="text-2xl">⋯</span>
            <span className="">
              MÁS
            </span>
          </a>
        </nav>
      </div>

      {/* BOTÓN INFERIOR */}
      <div className="mt-auto flex justify-center">
        <button className="text-sm text-gray-900 hover:text-red-900 transition">
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
