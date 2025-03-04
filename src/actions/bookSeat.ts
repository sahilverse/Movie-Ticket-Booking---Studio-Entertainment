"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { BookingStatus, SeatStatus, User } from "@prisma/client"
import { currentUser } from "@/lib/auth";



export async function createBooking(showId: string, seatIds: string[], movieSlug: string): Promise<{ success: boolean, bookingId?: string, error?: string }> {
    const user: User = await currentUser();

    if (seatIds.length < 1 || seatIds.length > 10) {
        throw new Error("Invalid number of seats");
    }

    try {
        const result = await prisma.$transaction(async (tx) => {

            // Fetching the selected
            const showSeatsUpdate = await prisma.showSeat.updateMany({
                where: { showId, seatId: { in: seatIds }, status: SeatStatus.AVAILABLE },
                data: { status: SeatStatus.BOOKED },

            })

            if (showSeatsUpdate.count !== seatIds.length || showSeatsUpdate.count === 0) {
                throw new Error(`Already Booked`);
            }

            const showSeats = await prisma.showSeat.findMany({
                where: { showId, seatId: { in: seatIds } },
                include: { seat: true }
            });

            const expiresAt = new Date(Date.now() + 60 * 8000); // 8 minutes

            const totalAmount = showSeats.reduce((sum, showSeat) => sum + showSeat.seat.price, 0)

            // Creating a new booking
            const newBooking = await tx.booking.create({
                data: {
                    userId: user.id,
                    showId: showId,
                    status: BookingStatus.PENDING,
                    amount: totalAmount,
                    expiresAt,
                    ShowSeat: {
                        connect: seatIds.map(seatId => ({ showId_seatId: { showId, seatId } })),
                    },
                },
            })


            return { newBooking };

        })

        revalidatePath(`/movie-details/${movieSlug}`);
        return { success: true, bookingId: result.newBooking.id }

    } catch (error: any) {

        if (error.message.includes("Already Booked")) {
            return { success: false, error: error.message }
        }

        if (error.code === "P2034") {
            return { success: false, error: "Transaction timeout. Please try again." }
        }

        return { success: false, error: "Failed to book seats. Please try again." }
    }
}