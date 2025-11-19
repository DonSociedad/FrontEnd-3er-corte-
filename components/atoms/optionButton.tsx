"use client";

import { ReactNode } from "react";

interface OptionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function OptionButton({ children, onClick, disabled, className }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-4 py-3 rounded-md border border-slate-600 bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:opacity-60 transition ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
