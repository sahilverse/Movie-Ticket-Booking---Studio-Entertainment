import { XCircle } from "lucide-react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { headers } from "next/headers"
import { currentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import PreventBackNavigation from "@/components/PreventBackNavigation"

export default async function FailurePage({
    searchParams,
}: {
    searchParams: { error?: string; ref?: string; bookingId?: string }
}) {

    const user = await currentUser();


    const forwardedFor = headers().get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0] : "unknown";


    let errorMessage = "Your payment could not be processed";
    let errorDetails = "Please try again or contact customer support.";
    let bookingId = searchParams.bookingId || null;
    let booking = null;


    console.error(
        `Payment failure: ${searchParams.error || "unknown"}, Ref: ${searchParams.ref || "none"}, IP: ${clientIp}`,
    )
    if (searchParams.error) {
        switch (searchParams.error) {
            case "verification_failed":
                errorMessage = "Payment verification failed";
                errorDetails = "Your payment could not be verified. Please try again.";
                break;
            case "invalid_request":
                errorMessage = "Invalid payment request";
                errorDetails = "The payment request was invalid. Please try again.";
                break;
            case "payment_cancelled":
                errorMessage = "Payment cancelled";
                errorDetails = "You cancelled the payment process.";
                break;
            case "payment_expired":
                errorMessage = "Payment session expired";
                errorDetails = "Your payment session has expired. Please try again.";
                break;
            default:
                errorMessage = "Payment processing error";
                errorDetails = "An error occurred while processing your payment.";
        }
    }


    if (bookingId) {
        try {
            booking = await prisma.booking.findUnique({
                where: { id: bookingId },
                include: {
                    show: {
                        include: {
                            movie: true,
                        },
                    },
                },
            })


            if (booking && booking.userId !== user.id) {
                console.error(
                    `Security alert: User ${user.id} attempted to access booking ${bookingId} belonging to user ${booking.userId}`,
                )
                booking = null;
                bookingId = null;
                redirect("/");
            }
        } catch (error) {
            console.error("Error fetching booking:", error);
            booking = null;
        }
    }

    return (
        <div className="main_container flex justify-center items-center h-[40rem]">
            <PreventBackNavigation redirectTo="/" />
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="text-center flex flex-col items-center space-y-6">
                    <div className="flex justify-center mb-4">
                        <XCircle className="h-16 w-16 text-red-500" />
                    </div>
                    <CardTitle className="text-2xl font-roboto tracking-wide">{errorMessage}</CardTitle>
                    <CardDescription className="text-zinc-400 font-poppins tracking-wide">{errorDetails}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {booking && (
                        <div className="bg-zinc-800 p-4 rounded-md space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Movie:</span>
                                <span>{booking.show.movie.title}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Amount:</span>
                                <span>Rs. {booking.amount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Booking ID:</span>
                                <span>{booking.id}</span>
                            </div>
                        </div>
                    )}

                    <div className="text-sm text-zinc-400 text-center font-poppins tracking-wide leading-8">
                        <p>If you believe this is an error, please contact our customer support.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    {booking && (
                        <Link href={`/checkout/${booking.id}`} className="w-full">
                            <Button className="bg-yellowShade hover:bg-yellowShadeHover text-black font-bold w-full font-roboto tracking-wider">Try Payment Again</Button>
                        </Link>
                    )}
                    <Link href="/" className="w-full">
                        <Button className="bg-yellowShade hover:bg-yellowShadeHover text-black w-full font-bold font-roboto tracking-wider">
                            Return to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

