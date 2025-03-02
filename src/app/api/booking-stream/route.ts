import { NextResponse } from "next/server"
import { headers } from "next/headers"
import watchBookingDeletions from "@/lib/mongoChangeStream"

export async function GET() {
    const headersList = headers()

    // Set up Server-Sent Events
    const response = new NextResponse(
        new ReadableStream({
            async start(controller) {
                const client = await watchBookingDeletions()

                    // Store the client connection in global scope to close it later
                    ; (global as any).__mongoClient = client

                // Send a initial connection message
                controller.enqueue('data: {"type":"connected"}\n\n')
            },
        }),
        {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
            },
        },
    )

    return response;
}

