"use server"

import { prisma } from "@/lib/prisma"
import { PaymentMethod, PaymentStatus } from "@prisma/client"
import { currentUser } from "@/lib/auth"

type EsewaParams = {
    amt: number
    pdc: number
    psc: number
    txAmt: number
    tAmt: number
    pid: string
    scd: string
    success_url: string
    failure_url: string
}

export async function initiateEsewaPayment(bookingId: string) {
    const user = await currentUser();
    try {
        // Get booking details
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId, userId: user.id },
            include: {
                ShowSeat: {
                    include: { seat: true },
                },
            },
        })

        if (!booking) {
            throw new Error("Booking not found");
        }

        // Calculate total amount
        const totalAmount = booking.ShowSeat.reduce((sum, showSeat) => sum + showSeat.seat.price, 0)

        // Create or update payment record
        const payment = await prisma.payment.upsert({
            where: { bookingId },
            update: {
                amount: totalAmount,
                method: PaymentMethod.ESEWA,
                status: PaymentStatus.PENDING,
            },
            create: {
                bookingId,
                amount: totalAmount,
                method: PaymentMethod.ESEWA,
                status: PaymentStatus.PENDING,
                transactionUuid: `UUID_${bookingId}_${Date.now()}`
            },
        })

        // eSewa parameters
        const esewaParams: EsewaParams = {
            amt: totalAmount,
            pdc: 0,
            psc: 0,
            txAmt: 0,
            tAmt: totalAmount,
            pid: `BOOKING_${bookingId}`,
            scd: process.env.ESEWA_PRODUCT_CODE || "EPAYTEST",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?bookingId=${bookingId}`, // Success URL
            failure_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure?bookingId=${bookingId}`, // Failure URL
        }

        return { success: true, esewaParams }
    } catch (error) {
        console.error("Error initiating eSewa payment:", error)
        return { success: false, error: "Failed to initiate payment" }
    }
}

export async function verifyEsewaPayment(params: {
    bookingId: string
    oid: string
    amt: string
    refId: string
    status?: string
}) {
    const { bookingId, oid, amt, refId, status } = params

    try {
        if (status === "success") {
            // Update payment status to completed
            await prisma.payment.update({
                where: { bookingId },
                data: {
                    status: PaymentStatus.COMPLETED,
                },
            })

            // Update booking status to confirmed
            await prisma.booking.update({
                where: { id: bookingId },
                data: {
                    status: "CONFIRMED",
                },
            })

            // Generate ticket for the booking
            const booking = await prisma.booking.findUnique({
                where: { id: bookingId },
                include: { show: true },
            })

            if (booking) {
                await prisma.ticket.create({
                    data: {
                        bookingId,
                        expiresAt: booking.show.startTime,
                    },
                })
            }

            return { success: true }
        } else {
            // Update payment status to failed
            await prisma.payment.update({
                where: { bookingId },
                data: {
                    status: PaymentStatus.FAILED,
                },
            })

            return { success: false, error: "Payment verification failed" }
        }
    } catch (error) {
        console.error("Error verifying eSewa payment:", error)
        return { success: false, error: "Failed to verify payment" }
    }
}

