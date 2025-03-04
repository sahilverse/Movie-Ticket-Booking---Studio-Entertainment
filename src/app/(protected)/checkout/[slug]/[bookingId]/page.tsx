import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Clock, Calendar, Film, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CountdownTimer } from "@/components/client/checkout/timer"
import { PaymentButton } from "@/components/client/checkout/paymentButton"
import { currentUser } from "@/lib/auth"




const Checkout = async ({ params }: { params: { slug: string; bookingId: string } }) => {
    const user = await currentUser();
    const { slug, bookingId } = params;
    let booking;



    const movie = await prisma.movie.findFirst({
        where: {
            slug,
        },
    })

    try {
        booking = await prisma.booking.findUnique({
            where: {
                id: bookingId,
                userId: user.id,
            },
            include: {
                ShowSeat: {
                    include: {
                        seat: true,
                    },
                },
                show: {
                    include: {
                        screen: true,
                        movie: true,
                    },
                },
                user: true,
            },
        })
    } catch (error) {
        return notFound();
    }

    if (!movie || !booking) {

        return notFound();
    }



    // Calculate total amount
    const totalAmount = booking.ShowSeat.reduce((sum, showSeat) => sum + showSeat.seat.price, 0);


    // Grand total 
    const grandTotal = totalAmount;

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Movie and Show Details */}
                    <div className="md:col-span-2">
                        <Card className="bg-zinc-900 border-zinc-800 text-white">
                            <CardHeader>
                                <CardTitle>Booking Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Movie Info */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-24 h-36 relative overflow-hidden rounded-md">
                                        <Image
                                            src={movie.potraitImageUrl || "/placeholder.svg"}
                                            alt={movie.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{movie.title}</h2>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {movie.genre.map((g) => (
                                                <Badge key={g} variant="outline" className="bg-zinc-800 text-zinc-200">
                                                    {g}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-3 text-zinc-400 text-sm space-y-1">
                                            <p className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" /> {movie.duration}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Film className="h-4 w-4" /> {booking.show.language}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-zinc-800" />

                                {/* Show Details */}
                                <div className="space-y-3">
                                    <h3 className="font-medium">Show Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-zinc-400" />
                                            <span>{format(new Date(booking.show.startTime), "EEEE, MMMM d, yyyy")}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-zinc-400" />
                                            <span>{format(new Date(booking.show.startTime), "h:mm a")}</span>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-zinc-800" />

                                {/* Seat Details */}
                                <div className="space-y-3">
                                    <h3 className="font-medium">Seat Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-zinc-400">Screen: </span>
                                            <span>{booking.show.screen.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-zinc-400" />
                                            <span>
                                                {booking.ShowSeat.length} {booking.ShowSeat.length === 1 ? "Seat" : "Seats"}
                                            </span>
                                        </div>

                                        {/* Normal Seats */}
                                        {(() => {
                                            const normalSeats = booking.ShowSeat.filter((showSeat) => showSeat.seat.type === "NORMAL")
                                            if (normalSeats.length === 0) return null

                                            const normalSeatsText = normalSeats
                                                .map((showSeat) => `${showSeat.seat.row}${showSeat.seat.col}`)
                                                .join(", ")

                                            return (
                                                <div className="md:col-span-2">
                                                    <span className="text-zinc-400">Normal Seats ({normalSeats.length}): </span>
                                                    <span>{normalSeatsText}</span>
                                                </div>
                                            )
                                        })()}

                                        {/* Premium Seats */}
                                        {(() => {
                                            const premiumSeats = booking.ShowSeat.filter((showSeat) => showSeat.seat.type === "PREMIUM")
                                            if (premiumSeats.length === 0) return null

                                            const premiumSeatsText = premiumSeats
                                                .map((showSeat) => `${showSeat.seat.row}${showSeat.seat.col}`)
                                                .join(", ")

                                            return (
                                                <div className="md:col-span-2">
                                                    <span className="text-zinc-400">Premium Seats ({premiumSeats.length}): </span>
                                                    <span className="text-amber-400">{premiumSeatsText}</span>
                                                </div>
                                            )
                                        })()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Summary */}
                    <div className="md:col-span-1">
                        <Card className="bg-zinc-900 border-zinc-800 text-white">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Payment Summary</CardTitle>
                                    <CountdownTimer expiresAt={booking.expiresAt!} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                {/* Group seats by type and show count */}
                                {(() => {
                                    const normalSeats = booking.ShowSeat.filter((showSeat) => showSeat.seat.type === "NORMAL")
                                    const premiumSeats = booking.ShowSeat.filter((showSeat) => showSeat.seat.type === "PREMIUM")

                                    const normalTotal = normalSeats.reduce((sum, showSeat) => sum + showSeat.seat.price, 0)
                                    const premiumTotal = premiumSeats.reduce((sum, showSeat) => sum + showSeat.seat.price, 0)

                                    return (
                                        <>
                                            {normalSeats.length > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">Normal Seats ({normalSeats.length})</span>
                                                    <span>Rs. {normalTotal.toFixed(2)}</span>
                                                </div>
                                            )}
                                            {premiumSeats.length > 0 && (
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">Premium Seats ({premiumSeats.length})</span>
                                                    <span>Rs. {premiumTotal.toFixed(2)}</span>
                                                </div>
                                            )}
                                        </>
                                    )
                                })()}
                                <Separator className="bg-zinc-800" />
                                <div className="flex justify-between font-bold">
                                    <span>Total Amount</span>
                                    <span>Rs. {grandTotal.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <PaymentButton bookingId={bookingId} />
                            </CardFooter>
                        </Card>

                        <div className="mt-4 text-xs text-zinc-500">
                            <p className="mb-2">* Booking will expire in 8 minutes if payment is not completed.</p>
                            <p>* Tickets are non-refundable once purchased.</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Checkout;

