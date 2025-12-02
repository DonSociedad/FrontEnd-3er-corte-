"use client";
import LessonTable from "@/components/organism/admin/lessonTableComponent";
import Link from "next/link";

export default function AdminContentPage() {
  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Gestión de Contenido
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
            Administra las lecciones y su orden en el mapa.
            </p>
        </div>
        
        <Link href="/admin/lessons/create" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg flex items-center gap-2">
            <span>+</span> Crear Lección
        </Link>
      </div>

      <LessonTable />
    </div>
  );
}