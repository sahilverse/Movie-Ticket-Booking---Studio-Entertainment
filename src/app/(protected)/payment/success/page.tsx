import { verifyEsewaPayment } from "@/lib/payment"
import { prisma } from "@/lib/prisma"
import { CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookingStatus, PaymentStatus } from "@prisma/client"
import type { PaymentResponse } from "@/types/types"
import { v4 as uuidv4 } from "uuid"
import { headers } from "next/headers"
import { currentUser } from "@/lib/auth"
import PreventBackNavigation from "@/components/PreventBackNavigation"

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: { data?: string }
}) {
    const user = await currentUser();
    // Default state
    let isVerified = false
    let paymentData: PaymentResponse | null = null;
    let errorMessage = "Payment verification failed";
    let bookingId = null;


    if (!searchParams.data) {
        console.error("Missing required parameter: data");
        redirect("/payment/failure?error=invalid_request");
    }

    // Generate a nonce for CSRF protection
    const nonce = uuidv4();

    // Get client IP for logging
    const forwardedFor = headers().get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    try {
        const decodedData: PaymentResponse = JSON.parse(atob(searchParams.data));

        paymentData = decodedData;

        if (decodedData.status !== "COMPLETE") {
            console.warn(`Payment not complete. Status: ${decodedData.status}`);
            throw new Error(`Payment not complete. Status: ${decodedData.status}`);
        }

        //  Validate transaction UUID format
        const transactionUuid = decodedData.transaction_uuid;
        if (!transactionUuid || !/^[a-zA-Z0-9-]+$/.test(transactionUuid)) {
            console.error("Invalid transaction UUID format");
            throw new Error("Invalid transaction UUID format");
        }

        const result = await prisma.$transaction(async (tx) => {
            const payment = await tx.payment.findUnique({
                where: { transactionUuid },
                include: {
                    booking: {
                        include: {
                            user: true,
                        },
                    },
                },
            })

            if (!payment) {
                throw new Error("Payment not found");
            }

            if (user.id !== payment.booking.userId) {
                console.log("User ID mismatch, will redirect after transaction");
                throw new Error("USER_ID_MISMATCH");
            }

            if (payment.status === PaymentStatus.COMPLETED) {
                console.log(`Payment ${payment.id} already processed`);
                return {
                    payment,
                    existingTicket: await tx.ticket.findFirst({
                        where: { bookingId: payment.bookingId },
                    }),
                }
            }

            const signatureValid = verifyEsewaPayment(decodedData)
            if (!signatureValid) {
                console.error("Invalid payment signature");
                throw new Error("Invalid signature");
            }

            // Update payment status to COMPLETED
            await tx.payment.update({
                where: {
                    id: payment.id,
                },
                data: {
                    status: PaymentStatus.COMPLETED,
                    transactionCode: decodedData.transaction_code,
                    updatedAt: new Date(),
                },
            })

            // Update booking status to CONFIRMED
            await tx.booking.update({
                where: {
                    id: payment.bookingId,
                },
                data: {
                    status: BookingStatus.CONFIRMED,
                    expiresAt: null,
                    updatedAt: new Date(),
                },
            })

            // Update showSeat status to SOLD
            await tx.showSeat.updateMany({
                where: {
                    bookingId: payment.bookingId,
                },
                data: {
                    status: "SOLD",
                },
            })

            // Check if a ticket already exists
            const existingTicket = await tx.ticket.findFirst({
                where: { bookingId: payment.bookingId },
            })

            if (existingTicket) {
                return { payment, existingTicket };
            }

            // Generate ticket for the booking
            const booking = await tx.booking.findUnique({
                where: { id: payment.bookingId },
                include: { show: true },
            })

            if (!booking) {
                throw new Error("Booking not found");
            }

            const newTicket = await tx.ticket.create({
                data: {
                    bookingId: payment.bookingId,
                    expiresAt: booking.show.startTime,
                },
            })

            return { payment, newTicket };
        })

        bookingId = result.payment.bookingId;
        isVerified = true;

    } catch (error: unknown) {
        console.error("Payment verification error:", error)
        console.error(`Client IP: ${clientIp}, Data: ${searchParams.data?.substring(0, 20)}...`)

        if (error instanceof Error && error.message === "USER_ID_MISMATCH") {
            errorMessage = "USER_ID_MISMATCH"
            isVerified = false;
        } else {
            errorMessage = "Payment verification failed. Please contact customer support."
            isVerified = false;
        }
    }

    // Check if error was due to user ID mismatch
    if (errorMessage === "USER_ID_MISMATCH") {
        redirect("/");
    }

    if (!isVerified) {
        redirect(`/payment/failure?error=verification_failed&ref=${nonce}`);
    }

    return (
        <div className=" text-white flex items-center justify-center p-4  h-[40rem]">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-roboto tracking-wide">Payment Successful!</CardTitle>
                    <CardDescription className="text-zinc-400 font-roboto ">Your booking has been confirmed.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                        {paymentData && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Transaction ID:</span>
                                    <span>{paymentData.transaction_code}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Amount:</span>
                                    <span>Rs. {paymentData.total_amount}</span>
                                </div>
                                {bookingId && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Booking ID:</span>
                                        <span>{bookingId}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href={bookingId ? `/ticket/${bookingId}` : "/"}>
                        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                            {bookingId ? "View Ticket" : "Go Home"}
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
            <PreventBackNavigation redirectTo="/" />
        </div>
    )
}

