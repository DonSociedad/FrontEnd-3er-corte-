import FooterComponent from "@/components/organism/footerComponent";
import HeaderComponent from "@/components/organism/headerComponent";

export default function CoursesPage() {
    return (
    <>
        <HeaderComponent />
        
        <main className="min-h-screen flex items-center justify-center">
            <p className="text-xl text-gray-700">Comunidad</p>
        </main>
        
        <FooterComponent />
    </>
    );
}