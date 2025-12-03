'use client';

import PigAvatar from "@/components/molecules/pig/pigAvatar";
import useCommunity from "@/hooks/community/useCommunity";

import Image from 'next/image';
import Link from "next/link";
import { Search } from "lucide-react";


export default function CommunityOrganism() {
  // Consumimos el hook aquí adentro para encapsular la lógica
  const { users, loading, searchTerm, setSearchTerm } = useCommunity();

  return (
    <div className="w-full">
        
        {/* === SECCIÓN 1: CABECERA Y BUSCADOR === */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-800 tracking-tight">
              Comunidad <span className="text-pink-500">Piglance</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Conoce a otros estudiantes de finanzas</p>
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar estudiante..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-pink-100 bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100/50 outline-none transition-all placeholder:text-gray-300 font-medium text-gray-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* === SECCIÓN 2: ESTADOS DE CARGA === */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="text-4xl animate-bounce">
                <Image
                  src= "/images/icons/cargando.png"
                  alt = "cerdo"
                  width={50}
                  height={50}
                />
              </div>
              <div className="text-pink-400 font-bold text-xl">Cargando cerditos...</div>
          </div>
        )}

        {/* === SECCIÓN 3: GRILLA DE USUARIOS === */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {users.map((user) => (
              <Link href={`/community/${user.id}`} key={user.id} className="group outline-none">
                
                <article className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-pink-200 cursor-pointer flex flex-col items-center relative overflow-hidden h-full">
                  
                  {/* Decoración Fondo */}
                  <div className="absolute top-0 w-full h-28 bg-gradient-to-b from-pink-100 to-white rounded-t-[2rem] z-0"></div>

                  {/* Avatar */}
                  <div className="relative z-10 mt-6 mb-2 w-32 h-32 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <PigAvatar config={user.pig.equipped} className="w-full h-full" /> 
                  </div>

                  {/* Info Usuario */}
                  <div className="relative z-10 text-center w-full px-2 pb-2 mt-2">
                    <h3 className="text-lg font-black text-gray-800 truncate w-full group-hover:text-pink-500 transition-colors capitalize">
                      {user.name} {user.lastName}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-1 mb-4">
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                            Estudiante
                        </span>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-center items-center bg-gray-50 rounded-2xl px-6 py-2 w-auto inline-flex gap-5 text-xs font-bold text-gray-500 border border-gray-100 group-hover:border-pink-100 transition-colors shadow-sm">
                        <div className="flex flex-col items-center gap-1" title="Lecciones completadas">
                            <span className="text-lg">                
                              <Image 
                              src= "/images/icons/lecciones-completadas.png"
                              alt = "cerdo"
                              width={50}
                              height={50}
                            /></span>
                            <span>{user.completedLessons}</span>
                        </div>
                        <div className="w-[1px] h-6 bg-gray-200"></div>
                        <div className="flex flex-col items-center gap-1" title="Objetos conseguidos">
                            <span className="text-lg">                
                                          <Image 
                                              src= "/images/icons/piggy.png"
                                              alt = "cerdo"
                                              width={50}
                                              height={50}
                                            /></span>
                            <span>{user.pig.inventory.length}</span>
                        </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
        
        {/* === SECCIÓN 4: ESTADO VACÍO === */}
        {!loading && users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 opacity-70">
                <p className="text-6xl mb-4 grayscale">
                <Image 
                  src= "/images/icons/piggy.png"
                  alt = "cerdo"
                  width={50}
                  height={50}
                />
                </p>
                <p className="text-lg font-medium">No encontramos estudiantes.</p>
                {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-4 text-pink-500 hover:underline font-bold text-sm"
                    >
                      Limpiar búsqueda
                    </button>
                )}
            </div>
        )}
    </div>
  );
}