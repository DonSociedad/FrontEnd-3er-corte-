import { LessonNodeProps } from "@/interfaces/lessons/lessonNodeProps";
import React from "react";

export const LessonNode = ({ status, onClick, title }: LessonNodeProps) => {
  // Base styles
  const baseBtn = `w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-4`;

  // Estilos dinámicos según estado
  let statusStyles = "";
  let borderStyle = "";
  let iconColor = "#fff";

  switch (status) {
    case "available":
      // Rosado principal con efecto de elevación
      statusStyles = `bg-[#cf88a7] hover:bg-[#b87090] hover:-translate-y-1 shadow-[#cf88a7]/50 cursor-pointer`;
      borderStyle = "border-white";
      break;
    case "completed":
      // Rosado principal
      statusStyles = `bg-[#cf88a7] hover:bg-[#b87090] cursor-pointer`;
      borderStyle = "border-[#a66580]";
      break;
    case "locked":
    default:
      // Gris apagado
      statusStyles = "bg-slate-600 opacity-50 cursor-not-allowed grayscale";
      borderStyle = "border-slate-600";
      iconColor = "#94a3b8"; // Gris claro
      break;
  }

  const Icon = () => {
    if (status === "completed") {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6L9 17l-5-5" stroke={iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (status === "locked") {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={iconColor} />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center gap-3 group">
      {/* Botón Circular */}
      <button
        disabled={status === "locked"}
        onClick={onClick}
        className={`${baseBtn} ${statusStyles} ${borderStyle}`}
        aria-label={`Lección ${status}: ${title ?? "sin título"}`}
      >
        <div className={`transform transition-transform ${status === "available" ? "group-hover:scale-110" : ""}`}>
            <Icon />
        </div>
      </button>

      {/* Título: Cambiado a negro */}
      {title && (
        <span className={`text-sm font-medium text-center w-32 truncate transition-colors ${status === "locked" ? "text-slate-400" : "text-black"}`}>
          {title}
        </span>
      )}

      {/* Etiqueta Flotante "EMPEZAR" */}
      {status === "available" && (
        <div className="absolute mt-[4.5rem] animate-bounce z-10">
            {/* Texto cambiado a negro */}
            <div className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full shadow-lg border border-gray-200">
                EMPEZAR
            </div>
            {/* Triángulo del tooltip */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white mx-auto -mt-[28px]"></div>
        </div>
      )}
    </div>
  );
};