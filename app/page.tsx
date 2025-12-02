'use client';

import FooterComponent from "@/components/organism/footerComponent";
import AnimatedContainer from "@/components/utilities/animatedContainer";
import { useAuth } from '@/contexts/authContext';

import Image from "next/image";
import Link from "next/link";


export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();

  const heroImageSrc = isAuthenticated
    ? "/images/header/home-student.png" 
    : "/images/header/home2.png";       

  return (
    <>
      <div className="relative z-50 flex items-center justify-between px-6 py-4 bg-[#f8f4eb] text-gray-800 shadow-sm">
        <div className="flex items-center">
          <Link href="/" className="-m-1.5 p-1 flex items-center">
            <Image 
              className="h-auto w-auto" 
              src="/images/logos/Piglance.png" 
              alt="Piglance" 
              width={90} 
              height={60} 
              priority 
            />       
          </Link>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <Link href="/profile" className="flex items-center gap-3 group">
              <span className="hidden md:block font-medium text-gray-700 group-hover:text-rose-500 transition-colors">
                Mi Cuenta
              </span>
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-rose-300 shadow-sm group-hover:scale-105 transition-transform">
                <Image
                  src="/images/icons/usuario.png" 
                  alt="Perfil"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        )}
      </div>
      
      <main className="min-h-screen bg-neutral-50 flex flex-col">

        <AnimatedContainer>
          <section className="relative w-full h-[87vh] flex flex-col items-center justify-center text-center overflow-hidden">
            <Image
              src={heroImageSrc} 
              alt="Piglance Hero Background"
              fill 
              className="object-cover object-center" 
              priority 
              quality={100} 
            />
            <div className="absolute inset-0 bg-black/30 z-10" />
            
            <div className="relative z-20 px-4 max-w-4xl mx-auto flex flex-col items-center gap-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                {isAuthenticated ? (

                  <>
                    Bienvenido de nuevo a tu <br className="hidden md:block"/>
                    <span className="text-rose-400 drop-shadow-lg font-extrabold">ruta de aprendizaje</span>
                  </>
                ) : (
                  <>
                    El mejor sitio para aprender finanzas <br className="hidden md:block"/>
                    <span className="text-rose-400">mientras te diviertes</span>
                  </>
                )}
              </h1>

              <p className="text-lg md:text-xl text-gray-100 max-w-2xl drop-shadow-md">
                {isAuthenticated
                  ? "Continúa donde lo dejaste y sigue sumando logros a representación de tus conocimientos."
                  : "Toma el control de tu futuro financiero con herramientas simples y educación a tu ritmo."
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                {isAuthenticated ? (
                  <Link
                    href="/map" 
                    className="px-8 py-4 bg-rose-300 text-white font-bold rounded-full hover:bg-rose-700 hover:scale-105 transition-all duration-300 shadow-lg text-lg min-w-[200px]"
                  >
                    Continuar Curso
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/map"
                      className="px-8 py-4 bg-rose-300 text-white font-bold rounded-full hover:bg-rose-700 hover:scale-105 transition-all duration-300 shadow-lg text-lg min-w-[200px]"
                    >
                      Empezar ahora
                    </Link>
                    <Link
                      href="/login"
                      className="px-8 py-4 bg-white text-rose-500 font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg text-lg min-w-[200px]"
                    >
                      Iniciar sesión
                    </Link>
                  </>
                )}
              </div>
            </div>
          </section>
        </AnimatedContainer>
        
        <AnimatedContainer delay={0.5}>
          <section className="w-full bg-neutral-50 py-16">
              <div className="container mx-auto w-[90%] group cursor-pointer">
              <div className="flex flex-col md:flex-row items-stretch bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-blue-100">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50">
                  <div className="bg-blue-100 w-fit px-3 py-1 rounded-full text-blue-600 text-xs font-bold mb-4 uppercase tracking-wide">
                    Paso 1
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors">
                    Mejora tu vida financiera
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-6">
                    Aprende hábitos simples y herramientas que te ayudarán a
                    administrar mejor tu dinero, junto a herramientas nuevas de aprendizaje en la cual aprendes con gran constancia.
                  </p>
                  <span className="text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-20px] group-hover:translate-x-0">
                    Descubre cómo →
                  </span>
                </div>
                <div className="md:w-1/2 relative bg-blue-100 flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    className="relative z-10 w-full h-auto object-contain max-h-[400px] transition-transform duration-700 group-hover:scale-110"
                    src="/images/home/mejora.png"
                    alt="estaditica de mejora"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 z-20 bg-blue-900/90 flex flex-col items-center justify-center text-white p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2">💡 ¿Sabías que?</h3>
                    <p className="text-center text-lg">
                      El 60% de las personas mejora sus finanzas simplemente registrando sus gastos diarios y monitoreando no gastar innecesariamente. ¡Empieza hoy mismo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedContainer>

        <AnimatedContainer delay={1}>
          <section className="w-full bg-neutral-50 py-16">
            <div className="container mx-auto w-[90%] group cursor-pointer">
              <div className="flex flex-col md:flex-row-reverse items-stretch bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-rose-100">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-bl from-white to-rose-50">
                  <div className="bg-rose-100 w-fit px-3 py-1 rounded-full text-rose-600 text-xs font-bold mb-4 uppercase tracking-wide">
                    Paso 2
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 group-hover:text-rose-600 transition-colors">
                    Decisiones inteligentes
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-6">
                    Cursos diseñados meticulosamente para adaptarse a tu ritmo y a
                    tus necesidades específicas para lograr nuevas metas de aprendizaje.
                  </p>
                  <span className="text-rose-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-20px] group-hover:translate-x-0">
                    Ver cursos disponibles →
                  </span>
                </div>
                <div className="md:w-1/2 relative bg-rose-100 flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    className="relative z-10 w-full h-auto object-contain max-h-[400px] transition-transform duration-700 group-hover:scale-110"
                    src="/images/home/decisiones.png"
                    alt="desiciones inteligentes"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 z-20 bg-rose-900/90 flex flex-col items-center justify-center text-white p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2">🎓 Tu Ruta</h3>
                    <p className="text-center text-lg">
                      Nuestros usuarios reportan un ahorro del 20% en sus primeros 3 meses de educación financiera, no solo enseñamos ayudamos a las  personas
                      aplicar nuevas tecnias para nuevas metas que busquen llegar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedContainer>

        <AnimatedContainer delay={1.5}>
          <section className="w-full bg-neutral-50 py-16">
            <div className="container mx-auto w-[90%] group cursor-pointer">
              <div className="flex flex-col md:flex-row items-stretch bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-emerald-100">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-emerald-50">
                  <div className="bg-emerald-100 w-fit px-3 py-1 rounded-full text-emerald-600 text-xs font-bold mb-4 uppercase tracking-wide">
                    Meta Final
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors">
                    Domina tu dinero
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-6">
                    Toma el control de tus finanzas personales y alcanza tus metas económicas con confianza sin miedo a perdidas ni desperdicio del dinero.
                  </p>
                  <span className="text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-20px] group-hover:translate-x-0">
                    Alcanza la libertad →
                  </span>
                </div>
                <div className="md:w-1/2 relative bg-emerald-100 flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    className="relative z-10 w-full h-auto object-contain max-h-[400px] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
                    src="/images/home/domina1.png"
                    alt="libertad financiera"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 z-20 bg-emerald-900/90 flex flex-col items-center justify-center text-white p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2">🚀 Libertad</h3>
                    <p className="text-center text-lg">
                      La tranquilidad no tiene precio. Define tus metas hoy y la app trazará el camino matemático para lograrlas, no solo matemático también
                      el camino teorico a un entedimiento más allá de lo común.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedContainer>

      </main>
      <FooterComponent />
    </>
  );
}