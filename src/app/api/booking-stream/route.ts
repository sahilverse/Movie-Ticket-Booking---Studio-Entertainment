import { NextResponse } from "next/server"
import { headers } from "next/headers"
import watchBookingDeletions from "@/lib/mongoChangeStream"

// Store connections globally so they can be accessed from mongoChangeStream.ts
if (!(global as any).__connections) {
    ; (global as any).__connections = new Map()
}
const connections = (global as any).__connections


let mongoClientPromise: Promise<any> | null = null

export async function GET() {
    const headersList = headers()

    const connectionId = Date.now().toString() + Math.random().toString(36).substring(2, 15)

    let isConnectionActive = true

    // Set up Server-Sent Events
    const response = new NextResponse(
        new ReadableStream({
            async start(controller) {
                try {

                    connections.set(connectionId, controller)


                    if (isConnectionActive) {
                        controller.enqueue('data: {"type":"connecting"}\n\n')
                    }


                    if (!mongoClientPromise) {
                        mongoClientPromise = watchBookingDeletions().then((client) => {
                            ; (global as any).__mongoClient = client
                            return client
                        })
                    }


                    const timeoutPromise = new Promise((_, reject) => {
                        setTimeout(() => reject(new Error("Connection timeout")), 5000)
                    })

                    const client = await Promise.race([mongoClientPromise, timeoutPromise])


                    if (isConnectionActive) {
                        controller.enqueue('data: {"type":"connected"}\n\n')
                    }
                } catch (error) {
                    console.error("Error initializing MongoDB change stream:", error)

                    if (isConnectionActive) {
                        controller.error(error)
                    }

                    connections.delete(connectionId)
                }
            },
            cancel() {

                isConnectionActive = false


                connections.delete(connectionId)

                if (connections.size === 0 && (global as any).__mongoClient) {
                    console.log("Closing MongoDB connection as all clients disconnected")
                        ; (global as any).__mongoClient.close()
                    mongoClientPromise = null
                    delete (global as any).__mongoClient
                }
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

