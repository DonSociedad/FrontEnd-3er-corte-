import React from "react";

export const LessonNode = ({
  status,
  onClick,
  title,
}: {
  status: "completed" | "available" | "locked";
  onClick?: () => void;
  title?: string;
}) => {
  const baseBtn = `w-20 h-20 rounded-full flex items-center justify-center transition-transform shadow-lg`;

  const bgClass =
    status === "available"
      ? "bg-gradient-to-br from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400"
      : status === "completed"
      ? "bg-purple-300"
      : "bg-gray-700 opacity-60";

  const Icon = () => {
    if (status === "available") {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
        </svg>
      );
    }

    if (status === "completed") {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="#fff" />
        </svg>
      );
    }

    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6V9a6 6 0 1 0-12 0v2H4v10h16V11h-2z" fill="#fff" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        disabled={status === "locked"}
        onClick={onClick}
        className={`${baseBtn} ${bgClass} ${status !== "locked" ? "cursor-pointer" : "cursor-not-allowed"}`}
        aria-label={`Lección: ${title ?? "sin título"}`}
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <Icon />
        </div>
      </button>

      {title && <div className="text-sm text-gray-300 text-center w-28 truncate">{title}</div>}

      {status === "available" && (
        <div className="mt-1 px-3 py-0.5 bg-purple-700 text-xs text-white rounded-full">EMPEZAR</div>
      )}
    </div>
  );
};
