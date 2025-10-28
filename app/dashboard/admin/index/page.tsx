'use client'
import Link from "next/link";

export default function AdminIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-pink-600">Pigglance Admin</h1>
          <p className="text-gray-600 mt-2">
            Gestiona actividades, quizzes y ejercicios de aprendizaje financiero.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Crear Actividad */}
          <Link
            href="/dashboard/admin/crear-actividad"
            className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border border-pink-200 hover:border-pink-400"
          >
            <h2 className="text-xl font-semibold text-pink-600 mb-2">
              📘 Crear Actividad
            </h2>
            <p className="text-gray-600">
              Diseña una nueva actividad interactiva para los usuarios.
            </p>
          </Link>

          {/* Crear Quiz */}
          <Link
            href="/dashboard/admin/crear-quiz"
            className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border border-pink-200 hover:border-pink-400"
          >
            <h2 className="text-xl font-semibold text-pink-600 mb-2">
              🧠 Crear Quiz
            </h2>
            <p className="text-gray-600">
              Añade preguntas de opción múltiple para evaluar conocimientos.
            </p>
          </Link>

          {/* Crear Ejercicio */}
          <Link
            href="/dashboard/admin/crear-ejercicio"
            className="bg-white shadow-md hover:shadow-xl transition p-6 rounded-2xl border border-pink-200 hover:border-pink-400"
          >
            <h2 className="text-xl font-semibold text-pink-600 mb-2">
              💪 Crear Ejercicio
            </h2>
            <p className="text-gray-600">
              Crea ejercicios prácticos enfocados en hábitos financieros.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
