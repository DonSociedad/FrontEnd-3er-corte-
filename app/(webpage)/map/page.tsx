"use client";
import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/lessonsMap";

export default function MapPage(){
    return(
    <>
        <HeaderComponent />
        
        <main className="min-h-screen bg-[#0f172a]">
            <LessonsMap />
        </main>
    </>
    );
}