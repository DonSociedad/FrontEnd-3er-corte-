'use client'  
import CardComponent from "@/components/atoms/card";

import Link from "next/link";

export interface Exercise {
  _id: string;
  title: string;
  description: string;
  contentId: string; // references Content
  instructions: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

export default function exercises() {
   const exercises = [
    {
      id: 1,
      title: "Abdominal Crunch",
      description: "Fortalece los músculos del abdomen superior.",
    },
    {
      id: 2,
      title: "Plancha",
      description: "Excelente para trabajar el core y mejorar la postura.",
    },
    {
      id: 3,
      title: "Sentadillas",
      description: "Activa piernas y glúteos. Ideal para fuerza y resistencia.",
    },
    {
      id: 4,
      title: "Escaladora",
      description: "Ejercicio de cardio que activa todo el cuerpo.",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-300 mb-8">
        Ejercicios
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {exercises.map((exercise) => (
          <CardComponent
            key={exercise.id}
            title={exercise.title}
            description={exercise.description}
            onClick={() => alert(`Seleccionaste: ${exercise.title}`)}>
            <button className="mt-4 bg-pink-500 hover:bg-pink-600 text-white py-1.5 px-4 rounded-lg text-sm transition">
                Ver Detalles
            </button>
          </CardComponent>
        ))}
      </div>
    </div>
  );
}
