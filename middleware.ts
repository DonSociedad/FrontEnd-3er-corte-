import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Compruebe si la ruta es una de las rutas del módulo de estudiantes
    if (pathname === '/creator-studio' || pathname === '/profile') {
        const token = request.cookies.get('token');
        if (!token) {
            // Redirigir para iniciar sesión
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/creator-studio', '/profile'],
};
