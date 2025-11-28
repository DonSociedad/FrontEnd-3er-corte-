"use client";

import MultipleChoice from "@/components/molecules/multipleChoice";
import NextButton from "@/components/atoms/nextButton";
import { LearnOrganismProps } from "@/interfaces/lessons/learnOrganismProps";

export default function LearnOrganism({ title, prompt, options, onSelect, disabled, feedback, onNext }: LearnOrganismProps) {
  return (
    <div className="min-h-[60vh] flex items-start justify-center py-8 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-2xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100">{title}</h1>
        </header>

        <MultipleChoice prompt={prompt} options={options} onSelect={onSelect} disabled={disabled} feedback={feedback} />

        {feedback && (
          <div className="mt-4 flex justify-end">
            <div>
              <NextButton onClick={onNext} disabled={disabled} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
