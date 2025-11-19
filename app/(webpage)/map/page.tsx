import HeaderComponent from "@/components/organism/headerComponent";
import { LessonsMap } from "@/components/organism/lessons/LessonsMap";

export default function PerfilPage(){
    return(
    <>
        <HeaderComponent />
        
        <main className="min-h-screen bg-[#0f172a]">
            <LessonsMap />
        </main>
    </>
    );
}