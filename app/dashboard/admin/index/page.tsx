"use client";

import Link from "next/link";
import CardComponent from "@/components/atoms/card"; 
import Image from "next/image";

export default function AdminIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-pink-600">Administrador de pinglance</h1>
          <p className="text-gray-700 mt-2">
            Manejo de usuarios, contenidos y configuraciones de la plataforma.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <Link href="/dashboard/admin/crear-actividad">
            <CardComponent
              title="Crear una actividad, un cuestionario o un ejercicio"
              description="Diseña nuevas actividades de aprendizaje interactivas, cuestionarios o ejercicios para los usuarios."
            />
          </Link>

          {/* Usuarios */}
          <Link href="/dashboard/admin/listar-usuarios">
          <Image 
            src="/ver_usuarios.png" 
            alt="Inicio" 
            width={100} 
            height={100}
          /> 
            <CardComponent
              title="Ver usuarios"
              description="Vea quién está aprendiendo activamente y realice un seguimiento de su progreso."
            />
          </Link>

          {/* Ver más */}
          <Link href="/dashboard/admin/exercises">
            <Image 
            src="/ver_creaciones.png" 
            alt="Inicio" 
            width={100} 
            height={100}
            /> 
            <CardComponent
              title="Tus creaciones"
              description="Revisa y gestiona todas las actividades, cuestionarios y ejercicios que hayas creado."
            />
          </Link>

          {/*Contenidos */}
          <Link href="/dashboard/admin/contents">
          <Image 
            src="/crear_actividades.png" 
            alt="Inicio" 
            width={100} 
            height={100}
          /> 
            <CardComponent
              title="Contenidos"
              description="Revisa y gestiona todos los contenidos."
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
