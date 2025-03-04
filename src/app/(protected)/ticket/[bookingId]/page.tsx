
import { prisma } from "@/lib/prisma"
import { currentUser } from "@/lib/auth"
import { MovieTicket } from "@/components/client/ticket/movieTicket";
import { notFound } from "next/navigation";
import PreventBackNavigation from "@/components/PreventBackNavigation";


export default async function TicketPage({ params }: { params: { bookingId: string } }) {
    const user = await currentUser()

    if (!params.bookingId) {
        notFound();
    }

    // Fetch ticket with all related data
    const ticket = await prisma.ticket.findFirst({
        where: {
            booking: {
                id: params.bookingId,
                userId: user.id,
            },
        },
        include: {
            booking: {
                include: {
                    user: true,
                    show: {
                        include: {
                            movie: true,
                            screen: true,
                        },
                    },
                    ShowSeat: {
                        include: {
                            seat: true,
                        },
                    },
                },
            },
        },
    })

    if (!ticket) {
        notFound();
    }

    return (
        <div className="min-h-screen  text-white mt-10 sm:mt-20 px-4 ">
            <div className="max-w-4xl mx-auto">
                <PreventBackNavigation redirectTo="/" />
                <MovieTicket ticket={ticket} />
            </div>
        </div>
    )
}

