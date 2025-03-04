import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, authRoutes, privateRoutes, apiAuthPrefix } from "./routes"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const privateRoutePatterns = privateRoutes.map((route) => new RegExp(`^${route.replace(/:[^/]+/g, "[^/]+")}$`))

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { auth: session, nextUrl } = req
    const { pathname } = nextUrl

    // Early return for static assets and Next.js internals (handled by matcher)

    // Quick path normalization - remove trailing slash for consistency
    const normalizedPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname


    if (normalizedPath === "/signin") {
        return Response.redirect(new URL("/login", nextUrl));
    }

    // Check authentication status
    const isLoggedIn = !!session;

    // Check route types - using normalized path for consistency
    const isApiRoute = normalizedPath.startsWith(apiAuthPrefix)
    const isAuthRoute = authRoutes.includes(normalizedPath)
    const isPaymentRoute = normalizedPath.startsWith("/payment/")

    // API routes are handled by API route handlers
    if (isApiRoute) return;

    // Redirect authenticated users away from auth pages
    if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    // Check if current path matches any private route pattern
    const isPrivateRoute = privateRoutePatterns.some((pattern) => pattern.test(normalizedPath))

    // Redirect unauthenticated users away from private routes
    if (!isLoggedIn && isPrivateRoute) {
        // Store the original URL to redirect back after login
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", nextUrl.href);
        return Response.redirect(loginUrl);
    }

    // Handle payment routes with special headers
    if (isPaymentRoute) {

        const response = NextResponse.next()

        // Security headers for payment pages
        const securityHeaders = {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "Surrogate-Control": "no-store",
            "X-Content-Type-Options": "nosniff", // Prevent MIME type sniffing
            "X-Frame-Options": "DENY", // Prevent clickjacking
            "Content-Security-Policy": "frame-ancestors 'none'", // Additional clickjacking protection
        }

        // Apply all security headers
        Object.entries(securityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        })

        return response;
    }
    return NextResponse.next();
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}

