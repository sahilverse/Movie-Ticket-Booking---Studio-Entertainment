import Link from "next/link"
import { TicketIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyState() {
    return (
        <div className="text-center py-12 bg-glass rounded-xl">
            <TicketIcon className="h-16 w-16 mx-auto text-zinc-600 mb-4" />
            <h2 className="text-xl font-medium text-zinc-400 font-poppins tracking-wide">No bookings found</h2>
            <p className="text-zinc-500 mt-2 mb-6 font-roboto tracking-wide leading-relaxed">
                You haven't booked any tickets yet.
            </p>
            <Link href="/">
                <Button className="bg-yellowShade hover:bg-yellowShadeHover text-black font-roboto font-bold tracking-wider">Browse Movies</Button>
            </Link>
        </div>
    )
}

