import HeaderComponent from "@/components/organism/headerComponent";
import FooterComponentLogged from "@/components/organism/footerComponentLogged";
import WorkPlaceComponent from "@/components/molecules/workPlaceComponent";

export default function LoggedPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Header fijo a la izquierda */}
      <HeaderComponent />

      {/* Contenido central con scroll independiente */}
      <main className="flex-1 overflow-y-auto bg-gray-800 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 border-l-4 border-gray-500 ml-64 mr-[22rem]">
        <WorkPlaceComponent />
      </main>

      {/* Footer fijo a la derecha */}
      <FooterComponentLogged />
    </div>
  );
}
