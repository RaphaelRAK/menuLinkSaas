import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes accessibles sans être connecté
const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/signup', '/auth/reset-password']

// Routes réservées aux non-connectés (si connecté → rediriger)
const AUTH_ONLY_ROUTES = ['/auth/login', '/auth/signup']

// Routes qui nécessitent d'être connecté
const PROTECTED_ROUTES = ['/onboarding', '/dashboard']

// Valide qu'une URL de redirection est bien interne (anti open-redirect)
function isSafeRedirect(path: string): boolean {
  return (
    typeof path === 'string' &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.includes('\\')
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('ml_auth')

  // --- Utilisateur connecté sur une page auth (login/signup) ---
  if (isAuthenticated && AUTH_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  // --- Route protégée sans cookie ---
  if (!isAuthenticated && PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    const loginUrl = new URL('/auth/login', request.url)
    // Conserver la destination pour rediriger après login
    const redirectTo = pathname + request.nextUrl.search
    if (isSafeRedirect(redirectTo)) {
      loginUrl.searchParams.set('redirect', redirectTo)
    }
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclure les assets statiques, images, API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
