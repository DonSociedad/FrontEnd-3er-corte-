"use client";

import { useRouter } from "next/navigation"; 
import Image from "next/image"; // 1. Importamos Image
import MultipleChoice from "@/components/molecules/multipleChoice";
import NextButton from "@/components/atoms/nextButton";
import { LearnOrganismProps } from "@/interfaces/lessons/learnOrganismProps";

export default function LearnOrganism({ 
  title, 
  prompt, 
  options, 
  onSelect, 
  disabled, 
  feedback, 
  onNext 
}: LearnOrganismProps) {
  
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
      
      <Image 
        src="/images/home/fondolesson.png" 
        alt="Fondo Lesson"
        fill 
        priority 
        className="object-cover -z-10" 
      />

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-pink-100 p-8 relative overflow-hidden">

        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <header className="mb-8 relative z-10">
          
          <button 
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-[#81d4fa] hover:text-sky-600 transition-colors mb-2 group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Volver
          </button>
          
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#81d4fa] to-[#cf88a7ff]">
              {title}
            </span>
          </h1>
        </header>

        <div className="relative z-10">
          <MultipleChoice 
            prompt={prompt} 
            options={options} 
            onSelect={onSelect} 
            disabled={disabled} 
            feedback={feedback} 
          />
        </div>

        {feedback && (
          <div className="mt-8 flex justify-end relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="transform hover:scale-105 transition-transform">
              <NextButton onClick={onNext} disabled={disabled} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}