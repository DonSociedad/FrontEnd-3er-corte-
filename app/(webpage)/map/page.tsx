"use client";

import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import SidebarRight from "@/components/organism/sidebarRight";
import { useAuth } from "@/contexts/authContext"; // Importamos el contexto

export default function MapPage() {
  const { user } = useAuth(); 

  const isStudent = user?.role === 'student';

  const bgGradient = isStudent
    ? "from-cyan-100 via-teal-50 to-blue-100" 
    : "from-orange-100 via-amber-50 to-rose-100";

  return (
    <div 
      className={`
        w-full flex justify-center 
        bg-gradient-to-br ${bgGradient} 
        min-h-screen pr-80 px-4 
        transition-colors duration-700 ease-in-out
      `}
    >
      <HeaderComponent /> 
      
      <div className="flex-1 max-w-3xl">
          <LessonsMap />
      </div>

      <SidebarRight />
    </div>
  );
}