import { format } from "date-fns"
import Link from "next/link"
import { Film, Calendar, Clock, MapPin, TicketIcon, Eye } from "lucide-react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PaymentButton } from "@/components/client/checkout/paymentButton"
import { StatusBadge } from "./StatusBadge"
import { DetailItem } from "./DetailItem"
import type { BookingWithDetails, ShowSeatWithSeat } from "@/types/types"

interface BookingCardProps {
    booking: BookingWithDetails
    isPast?: boolean
    formatSeats: (seats: ShowSeatWithSeat[]) => string
}

export function BookingCard({ booking, isPast = false, formatSeats }: BookingCardProps) {
    const bgClass = isPast ? "bg-glass/50" : "bg-glass"
    const borderClass = isPast ? "border-slightGray/50" : "border-slightGray"
    const titleClass = isPast ? "text-zinc-300" : ""
    const dateTextClass = isPast ? "text-zinc-500" : "text-zinc-400"
    const borderDividerClass = isPast ? "border-slightGray/20" : "border-slightGray/30"
    const amountLabelClass = isPast ? "text-zinc-500" : "text-zinc-400"
    const amountValueClass = isPast ? "text-zinc-300" : "text-white"

    return (
        <AccordionItem
            key={booking.id}
            value={booking.id}
            className={`border ${borderClass} rounded-lg overflow-hidden ${bgClass} `}
        >
            <AccordionTrigger className="px-6 py-4 hover:bg-black/20  hover:no-underline">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full text-left gap-2">
                    <div className="flex items-center gap-3">
                        <Film className={`h-5 w-5 ${isPast ? "text-zinc-500" : "text-yellowShade"} hidden sm:block`} />
                        <span className={`font-medium text-lg font-poppins tracking-wide leading-relaxed ${titleClass}`}>
                            {booking.show.movie.title}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusBadge status={booking.status} />
                        <span className={`text-sm ${dateTextClass} mr-2`}>
                            {format(new Date(booking.show.startTime), "MMM d, yyyy")}
                        </span>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-6">
                        <DetailItem
                            icon={Calendar}
                            label="Date"
                            value={format(new Date(booking.show.startTime), "EEEE, MMMM d, yyyy")}
                            isPast={isPast}
                        />
                        <DetailItem
                            icon={Clock}
                            label="Time"
                            value={format(new Date(booking.show.startTime), "h:mm a")}
                            isPast={isPast}
                        />
                    </div>
                    <div className="space-y-6">
                        <DetailItem icon={MapPin} label="Screen" value={booking.show.screen.name} isPast={isPast} />
                        <DetailItem icon={TicketIcon} label="Seats" value={formatSeats(booking.ShowSeat)} isPast={isPast} />
                    </div>
                </div>
                <div className={`flex justify-between items-center border-t ${borderDividerClass} pt-4 `}>
                    <div className="flex flex-col gap-2">
                        <p className={`${amountLabelClass} text-xs font-roboto tracking-wider uppercase`}>Amount</p>
                        <p className={`${amountValueClass} font-medium font-poppins tracking-wide`}>
                            Rs. {booking.amount.toFixed(2)}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        {booking.status === "CONFIRMED" && booking.Ticket.length > 0 && (
                            <Link href={`/ticket/${booking.id}`}>
                                {isPast ? (
                                    <Button className="bg-zinc-700 text-zinc-300 hover:bg-zinc-800">
                                        <Eye className="h-4 w-4 mr-2" /> View Ticket
                                    </Button>
                                ) : (
                                    <Button className="bg-yellowShade hover:bg-yellowShadeHover text-black">
                                        <Eye className="h-4 w-4 mr-2" /> View Ticket
                                    </Button>
                                )}
                            </Link>
                        )}

                        {booking.status === "PENDING" && !isPast && <PaymentButton bookingId={booking.id} />}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

