import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'
 

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}
// This function can be marked `async` if using `await` inside
export const middleware= async(request: NextRequest)=> {
    // If user is logged in, token will exist

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    
    const { pathname } = request.nextUrl
	let lng: string | undefined | null
	if (request.cookies.has(cookieName)) lng = acceptLanguage.get(request.cookies.get(cookieName)?.value)
	if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'))
	if (!lng) lng = fallbackLng
	// Allow request if (1) token exists
	// OR (2) it is a request for NextAuth session & provider
	// OR (3) it is a request to '/_next' (/_next/static/)
	if (token || pathname.includes('/api/auth') || pathname.includes('/_next')) {
		if (pathname === `/${lng}/login`) {
			return NextResponse.redirect(new URL('/', request.url))
		}

		return NextResponse.next()
	}

	// Redirect to login if (1) user doesn't have a token AND (2) is requesting protected route
	if (!token && pathname !== `/${lng}/login` && pathname !== `/${lng}/register`) {
		return NextResponse.redirect(new URL(`/${lng}/login`, request.url))
	}
	if (request.nextUrl.pathname.indexOf('icon') > -1 || request.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
	
  
	// Redirect if lng in path is not supported
	if (
	  !languages.some(loc => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
	  !request.nextUrl.pathname.startsWith('/_next')
	) {
	  return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url))
	}
  
	if (request.headers.has('referer')) {
	  const refererUrl = new URL(request.headers.get('referer') || '')
	  const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
	  const response = NextResponse.next()
	  if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
	  return response
	}
	return NextResponse.next()
}