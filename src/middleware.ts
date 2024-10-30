import NextAuth from "next-auth";

import { DEFAULT_LOGIN_REDIRECT, authRoutes, privateRoutes, apiAuthPrefix } from "./routes";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const isPrivateRoute = privateRoutes.some((route: any) => {
        const regex = new RegExp(`^${route.replace(/:[^/]+/, '[^/]+')}$`);
        return regex.test(nextUrl.pathname);
    });

    if (isApiRoute) return;

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    // Redirect to login if trying to access a private route and not logged in
    if (!isLoggedIn && isPrivateRoute) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    return;
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
