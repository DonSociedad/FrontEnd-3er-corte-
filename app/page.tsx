// home
import Image from "next/image";
import Link from "next/link";
import FooterComponent from "@/components/organism/footerComponent";
import AnimatedContainer from "@/components/utilities/animatedContainer";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-pink-100 text-gray-800 shadow-md">
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            {/* Logo de Piglance, se encuentra en la carpeta public donde se deben de poner las imagenes */}
            <Image 
              className="h-20 w-auto" 
              src="/Piglance.png" 
              alt="Piglance" 
              width={80} 
              height={80} 
              priority // ✅ Optimizado para Vercel
            />       
          </Link>
        </div>
      </div>
      
      <main className="min-h-screen bg-neutral-50 flex flex-col">
        {/* First section - Image */}
        <AnimatedContainer>
          <section className="w-full flex items-center justify-center overflow-hidden relative">
            <Image
              className="w-full h-auto max-h-[60vh] object-cover mx-auto"
              src="/cerdo3_2.png"
              alt="Piglance"
              width={1200}
              height={600}
              priority // ✅ Optimizado para Vercel
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-shadow text-gray-900">
                La mejor forma de aprender de finanzas mientras te diviertes en el proceso
              </h1>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center min-w-[140px] md:min-w-[160px] whitespace-nowrap bg-neutral-50 text-rose-700 font-bold py-3 px-4 rounded-full hover:bg-rose-700 hover:text-neutral-50 transition text-base md:text-lg"
                >
                  Empezar ahora
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center min-w-[140px] md:min-w-[160px] whitespace-nowrap bg-neutral-50 text-rose-700 font-bold py-3 px-4 rounded-full hover:bg-rose-700 hover:text-neutral-50 transition text-base md:text-lg"
                >
                  Ya tengo una cuenta
                </Link>
              </div>
            </div>
          </section>
        </AnimatedContainer>

        {/* Second section */}
        <AnimatedContainer delay={0.5}>
          <section className="w-full bg-neutral-50 flex items-center justify-center py-8">
            <div className="container mx-auto w-[90%] min-h-[45vh] flex flex-col md:flex-row items-stretch bg-gray-300 rounded-lg shadow-lg overflow-hidden">
              <div className="md:w-1/2 w-full p-6 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-lg md:text-2xl font-bold">
                    Mejora tu vida financiera
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-gray-700 max-w-lg mx-auto">
                    Aprende hábitos simples y herramientas que te ayudarán a
                    administrar mejor tu dinero en cualquier etapa.
                  </p>
                  <Image
                    className="w-full h-auto object-contain max-h-[40vh] md:max-h-[45vh] mt-4"
                    src="/hombre muppet.png"
                    alt="Hombre con dinero"
                    width={500}
                    height={450}
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedContainer>

        {/* Third section */}
        <AnimatedContainer delay={1}>
          <section className="w-full bg-neutral-50 flex items-center justify-center py-8">
            <div className="container mx-auto w-[90%] min-h-[45vh] flex flex-col md:flex-row-reverse items-stretch bg-gray-300 rounded-lg shadow-lg overflow-hidden">
              <div className="md:w-1/2 w-full p-6 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-lg md:text-2xl font-bold">
                    Formación para tomar mejores decisiones
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-gray-700 max-w-lg mx-auto">
                    Cursos y recursos diseñados para adaptarse a tu ritmo y a
                    tus necesidades específicas.
                  </p>
                  <Image
                    className="w-full h-auto object-contain max-h-[40vh] md:max-h-[45vh] mt-4"
                    src="/chica con libro.png"
                    alt="Chica con libro"
                    width={500}
                    height={450}
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedContainer>

        {/* Fourth section */}
        <AnimatedContainer delay={1.5}>
          <section className="w-full bg-neutral-50 flex items-center justify-center py-8">
            <div className="container mx-auto w-[90%] min-h-[45vh] flex flex-col md:flex-row items-stretch bg-gray-300 rounded-lg shadow-lg overflow-hidden">
              <div className="md:w-1/2 w-full p-6 flex flex-col items-center justify-center">
                <h2 className="text-lg md:text-2xl font-bold text-center mb-4">
                  Domina tu dinero
                </h2>
                <p className="text-sm md:text-base text-gray-700 text-center max-w-lg mx-auto">
                  Toma el control de tus finanzas personales y alcanza tus metas económicas.
                </p>
              </div>
              <div className="md:w-1/2 w-full p-6 flex items-center justify-center">
                <Image
                  className="w-full h-auto object-contain max-h-[40vh] md:max-h-[45vh]"
                  src="/hombre con corbata 4.png"
                  alt="Hombre con brazos arriba"
                  width={500}
                  height={450}
                />
              </div>
            </div>
          </section>
        </AnimatedContainer>
      </main>

      <FooterComponent />
    </>
  );
}