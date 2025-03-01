import { MongoClient } from "mongodb";
import { prisma } from "./prisma";


const uri = process.env.DATABASE_URL as string;

async function watchBookingDeletions() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("StudioEntertainment");
    const bookingsCollection = db.collection("Booking");

    console.log("🔄 Watching for expired booking deletions...");

    const changeStream = bookingsCollection.watch([{ $match: { operationType: "delete" } }]);

    changeStream.on("change", async (change: any) => {

        const bookingId = change.documentKey?._id.toString();

        try {

            await prisma.showSeat.updateMany({
                where: { bookingId },
                data: { status: "AVAILABLE", bookingId: null },
            });


            console.log(`✅ Released seats from booking ${bookingId}`);

        } catch (error) {
            console.error("❌ Error releasing seats:", error);
        }
    });

    return client;
}

export default watchBookingDeletions;
