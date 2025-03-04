"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface PreventBackNavigationProps {
    redirectTo?: string
}

export default function PreventBackNavigation({ redirectTo = "/" }: PreventBackNavigationProps) {
    const router = useRouter();

    useEffect(() => {

        history.pushState(null, "", location.href)

        const handlePopState = () => {
            history.pushState(null, "", location.href)


            if (redirectTo) {
                router.push(redirectTo);
            }
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        }
    }, [router, redirectTo])


    return null;
}

