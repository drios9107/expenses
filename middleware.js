import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(req) {
    // Skip static files and special paths
    if (req.nextUrl.pathname.includes('.')) return NextResponse.next()

    let lng
    // 1. Check path first
    const pathLng = languages.find(l => req.nextUrl.pathname.startsWith(`/${l}/`) || req.nextUrl.pathname === `/${l}`)
    if (pathLng) lng = pathLng

    // 2. Check cookie
    if (!lng && req.cookies.has(cookieName)) {
        lng = acceptLanguage.get(req.cookies.get(cookieName).value)
    }

    // 3. Check browser header
    if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))

    // 4. Fallback
    if (!lng) lng = fallbackLng

    // Redirect if language not in path
    if (!pathLng) {
        return NextResponse.redirect(
            new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )
    }

    if (pathLng && req.nextUrl.pathname === `/${pathLng}/${pathLng}`) {
        return NextResponse.redirect(new URL(`/${pathLng}`, req.url));
    }

    // Set language cookie if not present
    const response = NextResponse.next()
    if (!req.cookies.has(cookieName)) {
        response.cookies.set(cookieName, lng)
    }

    return response
}