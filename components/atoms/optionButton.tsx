"use client";

import { OptionButtonProps } from "@/interfaces/buttonInterfaces/optionButtonProps";

export default function OptionButton({ children, onClick, disabled, className }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left px-6 py-4 rounded-2xl border-2 font-medium text-lg
        transition-all duration-200 ease-in-out shadow-sm
        
        bg-white border-[#d89595ff] text-gray-600
        
        hover:bg-orange-50 hover:border-orange-300 hover:text-orange-900 hover:shadow-md hover:-translate-y-0.5
        
        /* Estado Disabled */
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
        
        ${className ?? ""}
      `}
    >
      {children}
    </button>
  );
}