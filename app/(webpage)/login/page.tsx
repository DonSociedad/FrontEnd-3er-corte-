import LoginComponent from "@/components/molecules/loginComponents"
import FooterComponent from "@/components/organism/footerComponent"
import HeaderComponent from "@/components/organism/headerComponent"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
        <HeaderComponent />

        <main className="flex flex-1 items-center justify-center bg-white py-8 px-4">
            <div className="p-8 bg-white shadow-lg rounded-xl w-full max-w-md flex flex-col gap-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Iniciar sesión ahora
                </h1>
                <h2 className="text-lg text-gray-700">
                Bienvenido de nuevo, querido estudiante.<br />
                Por favor ingresa tus datos
                </h2>
            </div>

            <div className="space-y-6">
                <LoginComponent />

                <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-600 text-center">
                    Este sitio cuenta con la protección de reCAPTCHA Enterprise. Además, se aplican la política de privacidad y los términos del servicio de Google
                    </span>
                </div>
                </div>

                <div className="space-y-4">
                <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400">
                    Iniciar sesión con Google
                </button>
                <div className="mt-4">
                    <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400">
                    Iniciar sesión con Apple
                    </button>
                </div>
                <div className="mt-4">
                    <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400">
                    Iniciar sesión con Facebook
                    </button>
                </div>
                </div>

                <div className="text-center mt-4">
                <p className="text-gray-700 text-base">¿No tienes cuenta?</p>
                <a href="/register" className="font-semibold text-pink-300 hover:text-pink-400 text-lg">
                    Regístrate
                </a>
                </div>
            </div>
            </div>
        </main>

        <FooterComponent />
        </div>
    )
}
