"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { BookingStatus, SeatStatus } from "@prisma/client"

export async function createBooking(showId: string, seatIds: string[], userId: string, movieSlug: string) {
    if (seatIds.length > 10) {
        throw new Error("Maximum 10 seats allowed per booking")
    }

    try {
        // Use a transaction to ensure all operations succeed or fail together
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create the booking
            const booking = await tx.booking.create({
                data: {
                    showId,
                    userId,
                    status: BookingStatus.PENDING,
                },
            })

            // 2. Update all selected seats status to BOOKED
            await tx.showSeat.updateMany({
                where: {
                    showId,
                    seatId: { in: seatIds },
                    status: SeatStatus.AVAILABLE, // Only update if currently available
                },
                data: {
                    status: SeatStatus.BOOKED,
                    bookingId: booking.id,
                },
            })

            // 3. Verify all seats were updated (in case some were already taken)
            const updatedSeats = await tx.showSeat.findMany({
                where: {
                    showId,
                    seatId: { in: seatIds },
                    bookingId: booking.id,
                },
            })

            if (updatedSeats.length !== seatIds.length) {
                throw new Error("Some seats are no longer available")
            }

            return { bookingId: booking.id }
        })

        // Set up cleanup timeout
        setTimeout(
            async () => {
                try {
                    await prisma.$transaction(async (tx) => {
                        const booking = await tx.booking.findUnique({
                            where: { id: result.bookingId },
                            include: { ShowSeat: true },
                        })

                        // Only cleanup if booking still exists and is still PENDING
                        if (booking && booking.status === BookingStatus.PENDING) {
                            // Reset seat statuses
                            await tx.showSeat.updateMany({
                                where: {
                                    bookingId: booking.id,
                                },
                                data: {
                                    status: SeatStatus.AVAILABLE,
                                    bookingId: null,
                                },
                            })

                            // Delete the booking
                            await tx.booking.delete({
                                where: { id: booking.id },
                            })

                            revalidatePath(`/movie-details/${movieSlug}`);
                        }
                    })
                } catch (error) {
                    console.error("Error in cleanup:", error);
                }
            },
            8 * 60 * 1000,
        ) // 8 minutes

        revalidatePath(`/movie-details/${movieSlug}`);
        return { success: true, bookingId: result.bookingId }
    } catch (error) {
        console.error("Error creating temporary booking:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create booking",
        }
    }
}

