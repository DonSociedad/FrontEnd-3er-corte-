"use client";

import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import SidebarRight from "@/components/organism/sidebarRight";

export default function MapPage() {
  return (

    <div className="w-full flex justify-center bg-gradient-to-br from-cyan-100 via-teal-50 to-blue-100 min-h-screen pr-80 px-4">
      <HeaderComponent />
      
      <div className="flex-1 max-w-3xl">
          <LessonsMap />
      </div>

      <SidebarRight />
    </div>
  );
}