// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Rutas que queremos proteger
  const adminRoutes = ['/admin']; 
  const studentRoutes = ['/profile', '/store', '/map', '/learn', '/community']; 
  const authRoutes = ['/login', '/register'];

  // 1. Si NO hay token y quiere entrar a rutas privadas -> Login
  if (!token) {
    if (adminRoutes.some(route => pathname.startsWith(route)) ||
        (studentRoutes.some(route => pathname.startsWith(route)) && !pathname.startsWith('/map') && !pathname.startsWith('/learn'))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    // 2. Verificar el token y leer el ROL
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey'); //Importante organizar
    
    // Esta función decodifica y valida que el token sea real
    const { payload } = await jwtVerify(token, secret);
    
    const role = payload.role as string; 

    // 3. Lógica de Redirección según ROL

    // A. Si ya está logueado y va al login, lo sacamos de ahí
    if (authRoutes.includes(pathname)) {
        if (role === 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/map', request.url)); 
        }
    }

    // B. Si es Estudiante e intenta entrar a /admin -> Lo mandamos a su mapa
    if (role === 'student' && adminRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/map', request.url));
    }

    // C. Si es Admin e intenta jugar (entrar a /learn) -> Lo mandamos a su dashboard
    if (role === 'admin' && studentRoutes.some(route => pathname.startsWith(route))) {
       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

  } catch (error) {
    // Si el token fue manipulado o expiró
    console.error('Token invalido en middleware');
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token'); 
    return response;
  }

  return NextResponse.next();
}

// A qué rutas afecta este middleware
export const config = {
  matcher: [
    '/admin/:path*', 
    '/profile/:path*', 
    '/community/:path*',
    '/store/:path*',
    '/map/:path*',
    '/learn/:path*',
    '/login', 
    '/register'
  ],
};