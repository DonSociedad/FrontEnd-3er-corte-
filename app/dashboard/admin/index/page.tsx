"use client";
import Link from "next/link";
import CardComponent from "@/components/atoms/card"; 
import Image from "next/image";

export default function AdminIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-pink-600">Pigglance Admin</h1>
          <p className="text-gray-700 mt-2">
            Manage activities, quizzes, and exercises for financial learning.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Crear */}
          <Link href="/dashboard/admin/crear-actividad">
            <CardComponent
              title="Create an Activity, Quiz or Exercise"
              description="Design new interactive learning activities, quizzes or exercises for users."
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
              title="View Users"
              description="See who is actively learning and track their progress."
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
              title="Your Creations"
              description="Review and manage all activities, quizzes and exercises you’ve created."
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
              description="Review and manage all the contents."
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
