export default function FooterComponent() {
    return (
        <footer className="bg-pink-100 text-gray-800 py-6 mt-10 shadow-inner">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">        
                <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 text-2xl">
                facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 text-2xl">
                twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 text-2xl">
                instagram
            </a>
            </div>

            {/*Noopener noreferrer -> previene manejos externos fuera de la pagina al ser re-direccionada, privacidad para que la informacion no se vaya al irse */}

            <div className="text-center text-lg font-bold mb-4 md:mb-0">
            Piglance © {new Date().getFullYear()}
            </div>

            <div>
            <select
                className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Portuguese</option> 
            </select>
            </div>
        </div>
        </footer>
    );
}
