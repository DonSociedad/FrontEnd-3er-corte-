// src/app/map/page.tsx (o donde tengas tu MapPage)
"use client";

import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import SidebarRight from "@/components/organism/sidebarRight";

export default function MapPage() {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <HeaderComponent />
      <main className="flex-1 md:ml-64 lg:mr-96 flex justify-center pt-8 pb-20 px-4">
        <div className="w-full max-w-[600px]">
          <LessonsMap />
        </div>
      </main>
      <SidebarRight />
    </div>
  );
}