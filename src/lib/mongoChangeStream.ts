import { MongoClient } from "mongodb"
import { prisma } from "./prisma"
import { Prisma } from "@prisma/client"

const uri = process.env.DATABASE_URL as string;

const MAX_RETRIES = 5;

export function broadcastEvent(event: any) {
    // Access the connections from the route.ts file
    const connections = (global as any).__connections;
    if (connections && connections.size > 0) {
        const message = `data: ${JSON.stringify(event)}\n\n`

        const controllersToRemove = []

        for (const [connectionId, controller] of connections.entries()) {
            try {
                controller.enqueue(message);
            } catch (error: any) {
                // If the controller is closed or in an invalid state, mark it for removal
                if (error.code === "ERR_INVALID_STATE") {
                    console.log(`Removing closed controller for connection ${connectionId}`);
                    controllersToRemove.push(connectionId);
                } else {
                    console.error(`Error broadcasting to client ${connectionId}:`, error);
                }
            }
        }
        controllersToRemove.forEach((connectionId) => {
            connections.delete(connectionId);
        })
    }
}

async function executeTransaction(bookingId: string) {
    let retries = 0;

    while (retries < MAX_RETRIES) {
        try {
            await prisma.$transaction([
                prisma.payment.delete({
                    where: { bookingId },
                }),
                prisma.showSeat.updateMany({
                    where: { bookingId },
                    data: { status: "AVAILABLE", bookingId: null },
                }),
            ])
            console.log(`✅ Released seats from booking ${bookingId}`)

            // Broadcast the event to all connected clients
            broadcastEvent({
                type: "booking_deleted",
                bookingId,
                timestamp: new Date().toISOString(),
            })

            return true;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2034") {
                    retries++
                    console.log(`Retry attempt ${retries} for booking ${bookingId}`)
                    await new Promise((resolve) => setTimeout(resolve, 1000 * retries))
                    continue
                }
            }
            throw error;
        }
    }
    throw new Error(`Failed to process booking ${bookingId} after ${MAX_RETRIES} attempts`)
}

async function watchBookingDeletions() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("StudioEntertainment");
    const bookingsCollection = db.collection("Booking");

    console.log("🔄 Watching for expired booking deletions...");

    const changeStream = bookingsCollection.watch([{ $match: { operationType: "delete" } }])

    changeStream.on("change", async (change: any) => {
        const bookingId = change.documentKey?._id.toString()

        try {
            await executeTransaction(bookingId);
        } catch (error) {
            console.error("❌ Error releasing seats:", error);
        }
    })

    return client;
}

export default watchBookingDeletions;

