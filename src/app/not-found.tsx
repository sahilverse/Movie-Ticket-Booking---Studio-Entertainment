import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center  text-white main_container my-40">
            <h1 className="text-6xl font-bold mb-4 ">404</h1>
            <h2 className="text-2xl mb-8">Oops! Page not found</h2>
            <p className="text-lg mb-8 text-center max-w-md">
                We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/">
                <Button className="flex items-center space-x-2 bg-white text-black hover:bg-white">
                    <HomeIcon className="h-4 w-4" />
                    <span>Back to Home</span>
                </Button>
            </Link>
        </div>
    )
}