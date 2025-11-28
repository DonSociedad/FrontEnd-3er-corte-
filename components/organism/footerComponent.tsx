import Link from 'next/link';
import Image from 'next/image';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function FooterComponent() {
    return (
        <footer className="bg-pink-100 text-gray-700 py-12 border-t border-pink-200">
            <div className="container mx-auto px-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    <div className="flex flex-col space-y-4">
                        <div className="text-2xl font-bold text-gray-900">
                            Piglance
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Conectando personas para conseguir grandes experiencias y mejor relación con las finanzas.
                        </p>
                        <div className="text-sm font-semibold pt-2">
                            © {new Date().getFullYear()} Piglance Inc.
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-1">
                            Explorar
                        </h3>
                        <Link href="/nosotros" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Sobre Nosotros
                        </Link>
                        <Link href="/contacto" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Contacto
                        </Link>
                        <Link href="/blog" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Blog & Noticias
                        </Link>
                        <Link href="/faq" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Preguntas Frecuentes
                        </Link>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-1">
                            Legal y Ayuda
                        </h3>
                        <Link href="/terminos" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Términos y Condiciones
                        </Link>
                        <Link href="/privacidad" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Política de Privacidad
                        </Link>
                        <Link href="/cookies" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Política de Cookies
                        </Link>
                        <Link href="/soporte" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">
                            Centro de Ayuda
                        </Link>
                    </div>

                    <div className="flex flex-col space-y-6">

                        <div>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-3">
                                Síguenos
                            </h3>
                            <div className="flex gap-4">
                                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all">
                                    <Image
                                        src="/facebook.png" 
                                        alt="Facebook" 
                                        width={24}
                                        height={24}
                                        className="w-6 h-6"
                                    />
                                </Link>
                                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all">
                                    <Image 
                                        src="/instagram.png" 
                                        alt="Instagram" 
                                        width={24} 
                                        height={24} 
                                        className="w-6 h-6"
                                    />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm ">
                                Configuración
                            </h3>
                            <Select>
                                <SelectTrigger className="w-full bg-white border-pink-200 hover:border-pink-300 focus:ring-pink-200">
                                    <SelectValue placeholder="Idioma" />
                                </SelectTrigger>
                                <SelectContent 
                                    className="bg-white border-gray-200 shadow-lg" 
                                    side="bottom"       
                                    position="popper"    
                                    sideOffset={5}     
                                >
                                    <SelectGroup>
                                        <SelectLabel>Selecciona un idioma</SelectLabel>
                                        <SelectItem value="es">🇪🇸 Español</SelectItem>
                                        <SelectItem value="en">🇺🇸 Inglés</SelectItem>
                                        <SelectItem value="pt">🇧🇷 Portugués</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}