"use client";

import ButtonComponent from "@/components/atoms/buttonComponents";
import Image from "next/image";

export default function ContenidosListPage() {
  const contenidos = [
    {
      id: 1,
      titulo: "Autos eléctricos: el futuro del transporte",
      descripcion: "Descubre cómo la movilidad eléctrica está transformando la industria automotriz.",
      categoria: "Tecnología",
      fecha: "Oct 2025",
    },
    {
      id: 2,
      titulo: "Finanzas básicas para conductores",
      descripcion: "Aprende cómo calcular costos, ahorro de combustible y mantenimiento inteligente.",
      categoria: "Educación financiera",
      fecha: "Sept 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">
          <Image
            src="/images/icons/contenido.png" 
            alt="Icono de Contenidos"
            width={50}
            height={50}
            className="inline-block mr-3 object-contain"
          />
          Gestión de Contenidos
        </h1>
        <ul className="space-y-6">
          {contenidos.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow-md rounded-xl border border-pink-200 hover:border-pink-400 p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{item.titulo}</h2>
                  <p className="text-gray-600 mt-2">{item.descripcion}</p>
                </div>
                <span className="text-sm text-pink-500 font-medium">{item.fecha}</span>
              </div>
              <div className="mt-3 text-sm text-gray-500">{item.categoria}</div>
            <div className="flex gap-3 mt-4">
                <ButtonComponent
                type={3} // estilo según tu hook useButton
                content="Editar"
                />
                <ButtonComponent
                type={3}
                content="Eliminar"
                />
            </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
