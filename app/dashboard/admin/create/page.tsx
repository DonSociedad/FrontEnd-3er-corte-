'use client'
import { useState, ChangeEvent, FormEvent } from "react";

interface ActivityFormData {
  title: string;
  type: string;
  content: string;
  question: string;
  answers: string[];
  correctAnswer: number | null;
}

export default function CreateActivity() {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    type: "quiz",
    content: "",
    question: "",
    answers: ["", "", "", ""],
    correctAnswer: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAnswerChange = (i: number, value: string) => {
    const updated = [...formData.answers];
    updated[i] = value;
    setFormData({ ...formData, answers: updated });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Actividad creada (modo visual)");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        Crear nueva actividad
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-600">Título</label>
          <input
            name="title"
            placeholder="Ej. Introducción al ahorro"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 mt-1"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 mt-1"
          >
            <option value="quiz">Quiz</option>
            <option value="ejercicio">Ejercicio</option>
            <option value="actividad">Actividad teórica</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">Descripción</label>
          <textarea
            name="content"
            placeholder="Descripción o instrucciones..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 mt-1"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">Pregunta</label>
          <input
            name="question"
            placeholder="Ej. ¿Qué es el ahorro?"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 mt-1"
            value={formData.question}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            Respuestas posibles
          </label>
          {formData.answers.map((ans, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={ans}
                placeholder={`Respuesta ${i + 1}`}
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-pink-400"
                onChange={(e) => handleAnswerChange(i, e.target.value)}
              />
              <input
                type="radio"
                name="correctAnswer"
                checked={formData.correctAnswer === i}
                onChange={() => setFormData({ ...formData, correctAnswer: i })}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-400 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
        >
          Guardar actividad
        </button>
      </form>
    </div>
  );
}
