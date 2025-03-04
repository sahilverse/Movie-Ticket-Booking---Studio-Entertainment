import { currentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import { Accordion } from "@/components/ui/accordion"
import { ShowSeatWithSeat } from "@/types/types"
import { EmptyState } from "@/components/client/my-tickets/EmptyState"
import { SectionHeader } from "@/components/client/my-tickets/SectionHeader"
import { BookingCard } from "@/components/client/my-tickets/BookingCard"


export default async function MyTicketsPage() {
    const user = await currentUser()

    if (!user) {
        redirect("/login")
    }

    // Fetch all bookings for the current user
    const bookings = await prisma.booking.findMany({
        where: {
            userId: user.id,
        },
        include: {
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
            Ticket: true,
            payment: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    // Separate bookings into upcoming and past
    const now = new Date()
    const upcomingBookings = bookings.filter((booking) => new Date(booking.show.startTime) > now)
    const pastBookings = bookings.filter((booking) => new Date(booking.show.startTime) <= now)

    // Helper function to format seats
    const formatSeats = (showSeats: ShowSeatWithSeat[]) => {
        return showSeats.map((showSeat) => `${showSeat.seat.row}${showSeat.seat.col}`).join(", ")
    }

    return (
        <div className=" text-white py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center font-poppins tracking-wide">My Tickets</h1>

                {bookings.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-8">
                        {upcomingBookings.length > 0 && (
                            <div>
                                <SectionHeader icon={Calendar} title="Upcoming Shows" />
                                <Accordion type="single" collapsible className="space-y-4">
                                    {upcomingBookings.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} formatSeats={formatSeats} />
                                    ))}
                                </Accordion>
                            </div>
                        )}

                        {pastBookings.length > 0 && (
                            <div>
                                <SectionHeader icon={Clock} title="Past Shows" isPast />
                                <Accordion type="single" collapsible className="space-y-4">
                                    {pastBookings.map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} isPast formatSeats={formatSeats} />
                                    ))}
                                </Accordion>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

