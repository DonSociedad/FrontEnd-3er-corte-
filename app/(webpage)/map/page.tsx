// src/app/map/page.tsx (o donde tengas tu MapPage)
"use client";

import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import SidebarRight from "@/components/organism/sidebarRight";

export default function MapPage() {
  return (
    <div className="flex min-h-screen bg-[#f3e9d9]">
      <HeaderComponent />
      <main className="flex-1  md:ml-64 lg:mr-96 flex justify-ccenter pt-8 pb-20 px-4">
        <div className="w-full max-w-[2050px]">
          <LessonsMap />
        </div>
      </main>
      <SidebarRight />
    </div>
  );
}