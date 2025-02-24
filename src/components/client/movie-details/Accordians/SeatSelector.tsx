"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Armchair } from "lucide-react"
import type { Seat, SeatStatus } from "@prisma/client"

interface SeatSelectorProps {
    seats: Seat[]
    showSeats: {
        id: string
        showId: string
        seatId: string
        status: SeatStatus
        bookingId?: string
    }[]
    onSeatSelect: (selectedSeats: string[]) => void
    selectedSeats: string[]

}

const SeatSelector: React.FC<SeatSelectorProps> = ({ seats, showSeats, onSeatSelect, selectedSeats }) => {


    const getSeatStatus = (seatId: string) => {
        const showSeat = showSeats.find((ss) => ss.seatId === seatId)
        return showSeat?.status || "AVAILABLE"
    }

    const handleSeatClick = (seatId: string) => {
        const status = getSeatStatus(seatId)
        if (status !== "AVAILABLE") return

        if (selectedSeats.includes(seatId)) {
            onSeatSelect(selectedSeats.filter((id) => id !== seatId))
        } else if (selectedSeats.length < 10) {
            onSeatSelect([...selectedSeats, seatId])
        }
    }

    useEffect(() => {
        onSeatSelect(selectedSeats)
    }, [selectedSeats, onSeatSelect])

    // Get all rows and sort them in reverse order
    const rows = Array.from(new Set(seats?.map((seat) => seat.row)))
        .sort()
        .reverse()

    const totalAmount = selectedSeats.reduce((sum, seatId) => {
        const seat = seats.find((s) => s.id === seatId)
        return sum + (seat?.price || 0)
    }, 0)

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <div className="relative">
                    <div className="w-3/4 h-8 mx-auto mb-14 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent rounded-t-full"></div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-400">Screen</span>
                    </div>
                </div>
            </div>

            <div className="relative mt-20">
                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[800px] flex flex-col items-center">
                        {/* Normal Seats Section */}
                        {seats.some((seat) => seat.type === "NORMAL") && (
                            <>
                                <div className="text-center mb-4 w-full border-b border-gray-800 pb-2">
                                    <span className="text-sm text-gray-400">NORMAL NPR 300.00</span>
                                </div>
                                <div className="grid gap-y-2 mb-8">
                                    {rows
                                        .filter((row) => seats.some((seat) => seat.row === row && seat.type === "NORMAL"))
                                        .map((row) => (
                                            <div key={row} className="flex items-center gap-2">
                                                <span className="w-6 text-sm text-gray-400">{row}</span>
                                                <div className="flex gap-1">
                                                    {seats
                                                        .filter((seat) => seat.row === row && seat.type === "NORMAL")
                                                        .sort((a, b) => a.col - b.col)
                                                        .map((seat) => (
                                                            <button
                                                                key={seat.id}
                                                                onClick={() => handleSeatClick(seat.id)}
                                                                className={cn(
                                                                    "w-8 h-8 flex items-center justify-center transition-colors rounded-sm",
                                                                    selectedSeats.includes(seat.id) && "text-yellow-400",
                                                                    !selectedSeats.includes(seat.id) &&
                                                                    getSeatStatus(seat.id) === "AVAILABLE" &&
                                                                    "text-teal-500",
                                                                    getSeatStatus(seat.id) === "SOLD" && "text-red-500",
                                                                    getSeatStatus(seat.id) === "BOOKED" && "text-gray-600",
                                                                    getSeatStatus(seat.id) === "AVAILABLE" && "hover:opacity-80",
                                                                    getSeatStatus(seat.id) !== "AVAILABLE" && "cursor-not-allowed",
                                                                )}
                                                                title={`${seat.row}${seat.col}`}
                                                                disabled={getSeatStatus(seat.id) !== "AVAILABLE"}
                                                            >
                                                                <Armchair className="w-6 h-6" />
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </>
                        )}

                        {/* Premium Seats Section */}
                        {seats.some((seat) => seat.type === "PREMIUM") && (
                            <>
                                <div className="text-center mb-4 w-full border-b border-gray-800 pb-2">
                                    <span className="text-sm text-gray-400">PREMIUM NPR 450.00</span>
                                </div>
                                <div className="grid gap-y-2 mb-8">
                                    {rows
                                        .filter((row) => seats.some((seat) => seat.row === row && seat.type === "PREMIUM"))
                                        .map((row) => (
                                            <div key={row} className="flex items-center gap-2">
                                                <span className="w-6 text-sm text-gray-400">{row}</span>
                                                <div className="flex gap-1">
                                                    {seats
                                                        .filter((seat) => seat.row === row && seat.type === "PREMIUM")
                                                        .sort((a, b) => a.col - b.col)
                                                        .map((seat) => (
                                                            <button
                                                                key={seat.id}
                                                                onClick={() => handleSeatClick(seat.id)}
                                                                className={cn(
                                                                    "w-8 h-8 flex items-center justify-center transition-colors rounded-sm",
                                                                    selectedSeats.includes(seat.id) && "text-yellow-400",
                                                                    !selectedSeats.includes(seat.id) &&
                                                                    getSeatStatus(seat.id) === "AVAILABLE" &&
                                                                    "text-teal-500",
                                                                    getSeatStatus(seat.id) === "SOLD" && "text-red-500",
                                                                    getSeatStatus(seat.id) === "BOOKED" && "text-gray-600",
                                                                    getSeatStatus(seat.id) === "AVAILABLE" && "hover:opacity-80",
                                                                    getSeatStatus(seat.id) !== "AVAILABLE" && "cursor-not-allowed",
                                                                )}
                                                                title={`${seat.row}${seat.col}`}
                                                                disabled={getSeatStatus(seat.id) !== "AVAILABLE"}
                                                            >
                                                                <Armchair className="w-6 h-6" />
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Fixed position elements */}
                <div className="sticky left-0 w-full  backdrop-blur-sm">
                    {/* Legend */}
                    <div className="flex justify-center gap-6 backdrop-blur-sm p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Armchair className="w-5 h-5 text-teal-500" />
                            <span className="text-sm text-gray-400">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Armchair className="w-5 h-5 text-red-500" />
                            <span className="text-sm text-gray-400">Sold Out</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Armchair className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm text-gray-400">
                                Selected {selectedSeats.length > 0 && `(${selectedSeats.length})`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Armchair className="w-5 h-5 text-gray-600" />
                            <span className="text-sm text-gray-400">Unavailable</span>
                        </div>
                    </div>

                    {/* Selected Seats Summary */}
                    {selectedSeats.length > 0 && (
                        <div className="text-center mb-6 backdrop-blur-sm p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-2">
                                Selected Seats:{" "}
                                <span className="text-yellow-400">
                                    {selectedSeats
                                        .map((seatId) => {
                                            const seat = seats.find((s) => s.id === seatId)
                                            return seat ? `${seat.row}${seat.col}` : ""
                                        })
                                        .join(", ")}{" "}
                                    ({selectedSeats.length}/10)
                                </span>
                            </p>
                            <p className="text-sm text-gray-400">Total Amount: NPR {totalAmount.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SeatSelector;

