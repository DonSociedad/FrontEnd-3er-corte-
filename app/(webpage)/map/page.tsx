"use client";

import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";
import SidebarRight from "@/components/organism/sidebarRight";

export default function MapPage() {
  return (
    <div className=" w-full flex justify-center bg-[#f3e9d9] pr-80 px-4">
      <HeaderComponent />
          <LessonsMap />
      <SidebarRight />
    </div>
  );
}