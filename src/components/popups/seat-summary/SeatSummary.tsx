"use client"

import * as React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { Seat } from "@prisma/client"
import { ShowWithSeats } from "@/types/types"
import { Description } from "@radix-ui/react-dialog"



interface SeatSummaryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedSeats: string[]
    show: ShowWithSeats


}


export function SeatSummaryDialog({ open, onOpenChange, selectedSeats, show }: SeatSummaryDialogProps) {
    const [agreed, setAgreed] = React.useState(false)

    if (!show || !show.screen || !show.screen.seats) return null

    const selectedSeatsInfo = show.screen.seats.filter((seat) => selectedSeats.includes(seat.id))

    const seatsByType = selectedSeatsInfo.reduce(
        (acc, seat) => {
            if (!acc[seat.type]) {
                acc[seat.type] = {
                    seats: [],
                    total: 0,
                    price: seat.price,
                }
            }
            acc[seat.type].seats.push(seat)
            acc[seat.type].total += seat.price
            return acc;
        },
        {} as Record<string, { seats: Seat[]; total: number; price: number }>,
    )

    const totalAmount = Object.values(seatsByType).reduce((sum, { total }) => sum + total, 0)

    const totalSeats = selectedSeats.length



    const handleConfirm = () => {
        onOpenChange(false)

        // TODO: Implement this

        // Create a booking
        // createBooking(show.id, selectedSeats, user.id, show.movie.slug)

        // Clear the selected seats
        // clearSelectedSeats()
    }

    return (

        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className=" max-w-sm md:max-w-md bg-gray-800 text-white border-gray-700 rounded-sm" aria-label="Seat Summary" role="alertdialog" aria-modal="true" aria-labelledby="seat-summary-title" aria-describedby="seat-summary-description">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold mb-4 font-poppins">Specify Seat Type</DialogTitle>
                    </div>
                    <div className="bg-green-600 text-white text-sm py-1 px-4 rounded-full w-fit mx-auto mt-2">
                        Tickets Selected:  {totalSeats}
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="py-2 px-4 text-left text-sm font-medium">Seat Type</th>
                                    <th className="py-2 px-4 text-center text-sm font-medium">No. of Seats</th>
                                    <th className="py-2 px-4 text-right text-sm font-medium">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {Object.entries(seatsByType).map(([type, { seats, total, price }]) => (
                                    <tr key={type} className="bg-gray-800">
                                        <td className="py-3 px-4">
                                            <div>
                                                <div className="font-medium">{type}</div>
                                                <div className="text-sm text-gray-400">NPR {price.toFixed(2)}</div>
                                                <div className="text-sm text-gray-400">
                                                    {seats.map((seat) => `${seat.row}${seat.col}`).join(", ")}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">{seats.length}</td>
                                        <td className="py-3 px-4 text-right">NPR {total.toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-900 font-medium">
                                    <td className="py-3 px-4" colSpan={2}>
                                        TOTAL
                                    </td>
                                    <td className="py-3 px-4 text-right">NPR {totalAmount.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="text-yellow-400">
                            PLEASE NOTE: Transactions are confirmed only if you receive a QR code with ticket details. If you do not
                            receive the QR code, please contact us through the customer service form.
                        </div>


                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} className="border-white" />
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the terms and conditions
                        </label>
                    </div>

                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={!agreed}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

