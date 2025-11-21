"use client";

interface NextButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
}

export default function NextButton({ onClick, disabled, label = "Siguiente" }: NextButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-60 transition"
      >
        {label}
      </button>
    </div>
  );
}
