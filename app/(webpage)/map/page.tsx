"use client";

import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import SidebarRight from "@/components/organism/sidebarRight";

export default function MapPage() {
  return (
    <div className="flex min-h-screen bg-[#f3e9d9]">
      <HeaderComponent />
          <LessonsMap />
      <SidebarRight />
    </div>
  );
}