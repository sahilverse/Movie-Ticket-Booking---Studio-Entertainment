"use client"
import { Seat } from "@prisma/client"
import { Armchair } from "lucide-react"



export default function SeatLegend({
    seats = [],
    selectedSeats = [],
    totalAmount = 0,
}: {
    seats: Seat[]
    selectedSeats: string[]
    totalAmount: number
}) {
    return (
        <div className="sticky left-0 w-full backdrop-blur-sm">
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    <span className="text-xs sm:text-sm text-gray-400">Sold Out</span>
                </div>
                <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <span className="text-xs sm:text-sm text-gray-400">
                        Selected {selectedSeats.length > 0 && `(${selectedSeats.length})`}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <span className="text-xs sm:text-sm text-gray-400">Unavailable</span>
                </div>
            </div>

            {/* Selected Seats Summary */}
            {selectedSeats.length > 0 && (
                <div className="text-center mb-4 sm:mb-6 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
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
                    <p className="text-xs sm:text-sm text-gray-400">Total Amount: NPR {totalAmount.toFixed(2)}</p>
                </div>
            )}
        </div>
    )
}

