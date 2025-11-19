"use client";

import OptionButton from "@/components/atoms/optionButton";

interface Option {
  id: string;
  text: string;
}

interface MultipleChoiceProps {
  prompt: string;
  options: Option[];
  onSelect: (id: string) => void;
  disabled?: boolean;
  feedback?: { correct: boolean; explanation?: string } | null;
}

export default function MultipleChoice({ prompt, options, onSelect, disabled, feedback }: MultipleChoiceProps) {
  return (
    <div className="bg-slate-800 text-slate-100 rounded-lg shadow-md p-6">
      <p className="text-sm text-slate-300 mb-4">{prompt}</p>

      <div className="grid gap-3">
        {options.map((opt) => (
          <OptionButton key={opt.id} onClick={() => onSelect(opt.id)} disabled={!!disabled}>
            {opt.text}
          </OptionButton>
        ))}
      </div>

      {feedback && (
        <div className={`mt-4 p-3 rounded-md border flex items-start gap-3 ${feedback.correct ? 'bg-green-900 border-green-600 text-green-200' : 'bg-red-900 border-red-600 text-red-200'}`}>
          <div className="flex-shrink-0 mt-0.5">
            {feedback.correct ? (
              <svg className="w-6 h-6 text-green-200 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-red-200 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          <div>
            <strong>{feedback.correct ? 'Correcto' : 'Incorrecto'}</strong>
            {feedback.explanation && <p className="mt-2 text-sm">{feedback.explanation}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
