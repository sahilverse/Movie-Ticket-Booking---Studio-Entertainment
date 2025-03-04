"use client"

import { useRef, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Download, TicketIcon, Clock, Calendar, MapPin, User, CreditCard, Building2 } from "lucide-react"
import html2canvas from "html2canvas"
import type { Booking, Movie, Screen, Seat, Show, Ticket, User as PrismaUser } from "@prisma/client"

type TicketWithDetails = Ticket & {
    booking: Booking & {
        user: PrismaUser
        show: Show & {
            movie: Movie
            screen: Screen
        }
        ShowSeat: Array<{
            seat: Seat
        }>
    }
}

interface MovieTicketProps {
    ticket: TicketWithDetails
}

export function MovieTicket({ ticket }: MovieTicketProps) {
    const [downloading, setDownloading] = useState(false)
    const ticketRef = useRef<HTMLDivElement>(null)

    const { booking } = ticket
    const { show, user } = booking
    const { movie, screen } = show

    // Format dates
    const showDate = format(new Date(show.startTime), "EEEE, MMMM d, yyyy")
    const showTime = format(new Date(show.startTime), "h:mm a")
    const expiryDate = format(new Date(ticket.expiresAt), "MMM d, yyyy h:mm a")

    // Get seat information
    const seats = booking.ShowSeat.map((showSeat) => `${showSeat.seat.row}${showSeat.seat.col}`).join(", ")

    // Create QR code data
    const qrData = JSON.stringify({
        ticketId: ticket.id,
        bookingId: booking.id,
        userId: user.id,
        movieId: movie.id,
        showId: show.id,
        expiresAt: ticket.expiresAt,
    })

    const downloadTicket = async () => {
        if (!ticketRef.current) return

        try {
            setDownloading(true)

            const canvas = await html2canvas(ticketRef.current, {
                backgroundColor: null,
                logging: false,
            } as any)

            const image = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = image
            link.download = `movie-ticket-${booking.id}.png`
            link.click()
        } catch (error) {
            console.error("Error downloading ticket:", error)
        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="flex flex-col items-center max-w-md mx-auto">
            <div
                ref={ticketRef}
                className="w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-700 font-poppins"
            >
                {/* Theatre Logo/Name */}
                <div className=" py-3 px-5 bg-black flex justify-center items-center border-b border-zinc-800">
                    <div className="flex items-center gap-4">
                        <Building2 className="h-5 w-5 text-white" />
                        <h1 className="text-white font-roboto text-lg tracking-widest uppercase font-bold">
                            Studio Entertainment
                        </h1>
                    </div>
                </div>

                {/* Ticket Header with Tear Effect */}
                <div className="relative">
                    <div className="bg-yellowShade p-5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <TicketIcon className="h-7 w-7 text-black" />
                            <h2 className="text-xl font-bold text-black tracking-wide uppercase font-roboto">MOVIE TICKET</h2>
                        </div>
                        <div className="text-black text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                            #{ticket.id.substring(ticket.id.length - 6).toUpperCase()}
                        </div>
                    </div>

                    {/* Tear line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1">
                        <div className="flex justify-between">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-zinc-900"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Movie Details */}
                <div className="p-7 border-b border-zinc-700/50">
                    <h1 className="text-2xl font-bold text-white mb-2 tracking-wide font-roboto">{movie.title}</h1>
                    <div className="flex justify-between text-zinc-400 text-sm mb-5">
                        <span className="bg-zinc-800/80 px-3 py-1 rounded-full">
                            {movie.duration} • {show.language}
                        </span>
                        <span className="bg-zinc-800/80 px-3 py-1 rounded-full">{movie.rating || "PG-13"}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-5">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-yellowShade" />
                                <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Date</p>
                            </div>
                            <p className="text-white pl-6 font-medium">{showDate}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-yellowShade" />
                                <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Time</p>
                            </div>
                            <p className="text-white pl-6 font-medium">{showTime}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-yellowShade" />
                                <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Screen</p>
                            </div>
                            <p className="text-white pl-6 font-medium">{screen.name}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <TicketIcon className="h-4 w-4 text-yellowShade" />
                                <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Seats</p>
                            </div>
                            <p className="text-white pl-6 font-medium">{seats}</p>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="p-7 border-b border-zinc-700/50">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-yellowShade" />
                                <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Name</p>
                            </div>
                            <p className="text-white pl-6 font-medium">{user.name}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-yellowShade" />
                                <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Booking ID</p>
                            </div>
                            <p className="text-white pl-6 font-medium">{booking.id.substring(booking.id.length - 8).toUpperCase()}</p>
                        </div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="p-7 flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <p className="text-zinc-400 text-xs uppercase font-semibold tracking-wider">Valid Until</p>
                            <p className="text-white font-medium">{expiryDate}</p>
                        </div>
                        <p className="text-yellowShade text-xs mt-3 italic">Present this ticket at the entrance</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-lg">
                        <QRCodeSVG value={qrData} size={90} />
                    </div>
                </div>

                {/* Ticket Footer */}
                <div className="bg-zinc-900 p-4 text-center">
                    <p className="text-xs text-zinc-500 tracking-wider uppercase">
                        This ticket is non-refundable and non-transferable
                    </p>
                </div>
            </div>

            <Button
                onClick={downloadTicket}
                disabled={downloading}
                className="mt-8 bg-yellowShade hover:bg-yellowShadeHover text-black font-bold px-6 py-6 rounded-lg shadow-lg transition-all duration-300 text-base"
            >
                <Download className="mr-2 h-5 w-5" />
                {downloading ? "Processing..." : "Download Ticket"}
            </Button>
        </div>
    )
}

