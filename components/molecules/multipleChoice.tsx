"use client";

import { useState } from "react";
import OptionButton from "@/components/atoms/optionButton";
import { MultipleChoiceProps } from "@/interfaces/lessons/multipleChoiceProps";

export default function MultipleChoice({ prompt, options, onSelect, disabled, feedback }: MultipleChoiceProps) {
  
  // Guardamos cuál seleccionó el usuario visualmente
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  // Lógica para definir el "tema" del botón (status)
  const getButtonStatus = (optionId: string) => {
    // 1. Si ya respondimos (feedback existe)
    if (feedback) {
      if (optionId === selectedId) {
        return feedback.correct ? "correct" : "incorrect";
      }
      return "default";
    }
    // 2. Si solo estamos seleccionando
    if (selectedId === optionId) {
      return "selected"; 
    }
    return "default";
  };

  return (
    <div className="w-full">
      {/* PREGUNTA: Centrada y elegante */}
      <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8 text-center leading-relaxed">
        {prompt}
      </p>

      <div className="grid gap-4">
        {options.map((opt) => (
          <OptionButton 
            key={opt.id} 
            onClick={() => handleSelect(opt.id)} 
            disabled={!!disabled}
          >
            {opt.text}
          </OptionButton>
        ))}
      </div>

      {/* CAJA DE FEEDBACK (RESPUESTA) */}
      {feedback && (
        <div 
          className={`
            mt-8 p-6 rounded-3xl border-2 flex items-start gap-5 shadow-sm transition-all duration-500 animate-in fade-in slide-in-from-bottom-4
            ${feedback.correct 
              ? 'bg-teal-50 border-teal-100 text-teal-800'     // Correcto: Verde Menta Pastel
              : 'bg-orange-50 border-orange-100 text-orange-800' // Incorrecto: Coral/Melocotón Pastel
            }
          `}
        >
          {/* ÍCONO */}
          <div className={`p-2 rounded-full flex-shrink-0 ${feedback.correct ? 'bg-teal-100' : 'bg-orange-100'}`}>
            {feedback.correct ? (
              // Check Menta
              <svg className="w-6 h-6 text-teal-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              // X Coral
              <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8L8 16M8.00001 8L16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          {/* TEXTO DE RETROALIMENTACIÓN */}
          <div>
            <strong className={`block text-xl font-bold mb-2 ${feedback.correct ? 'text-teal-700' : 'text-orange-700'}`}>
              {feedback.correct ? '¡Respuesta Correcta!' : 'Ups, casi lo tienes...'}
            </strong>
            {feedback.explanation && (
              <p className="text-base opacity-90 leading-relaxed font-medium">
                {feedback.explanation}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}