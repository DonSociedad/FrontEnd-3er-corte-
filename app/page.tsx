//home
import FooterComponent from "@/components/organism/footerComponent";
import HeaderComponent from "@/components/organism/headerComponent";

export default function HomePage() {
  return (
    <>
      <HeaderComponent />
      
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Home</p>
      </main>
      
      <FooterComponent />
    </>
  )
}