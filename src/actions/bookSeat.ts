"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { BookingStatus, SeatStatus, User } from "@prisma/client"
import { currentUser } from "@/lib/auth";



export async function createBooking(showId: string, seatIds: string[], movieSlug: string) {
    const user: User = await currentUser();

    if (seatIds.length < 1 || seatIds.length > 10) {
        throw new Error("Invalid number of seats");
    }

    try {
        const result = await prisma.$transaction(async (tx) => {

            // Fetching the selected
            const showSeats = await prisma.showSeat.findMany({
                where: { showId, seatId: { in: seatIds }, status: SeatStatus.AVAILABLE }
            })



            // Updating the status of the selected seats
            const updatedShowSeat = await tx.showSeat.updateMany({
                where: { id: { in: showSeats.map(seat => seat.id) } },
                data: { status: "BOOKED" },
            })



            // Creating a new booking
            const newBooking = await tx.booking.create({
                data: {
                    userId: user.id,
                    showId: showId,
                    status: BookingStatus.PENDING,
                    ShowSeat: {
                        connect: showSeats.map(seat => ({ id: seat.id })),
                    },
                },
            })


            return { updatedShowSeat, newBooking };

        })

        revalidatePath(`/movie-details/${movieSlug}`);
        return { success: true, bookingId: result.newBooking.id }

    } catch (error) {

        console.error("Error booking seat:", error)
        return { success: false, error: "Failed to book seat" }

    }
}