export default function FooterComponent() {
    return (
        <footer className="bg-pink-100 text-gray-800 py-8 shadow-inner">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-6">
            
            {/* Redes sociales */}
            <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110" >
                <img src="/facebook.jpg" alt="Facebook" className="h-15 w-15"/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="transition-transform transform hover:scale-110">
                <img src="/instagrama.jpg" alt="Instagram" className="h-15 w-15"/>
            </a>
            </div>

            <div className="text-center text-lg font-bold">
            Piglance © {new Date().getFullYear()}
            </div>

            <div>
            <select className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
            </select>
            </div>
        </div>
        </footer>
    );
}
