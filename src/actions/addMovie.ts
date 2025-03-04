"use server"


import { prisma } from "@/lib/prisma";
import { SeatStatus } from "@prisma/client";


import { toZonedTime } from 'date-fns-tz';

type ShowData = {
    movieId: string;
    screenId: string;
    startTime: string;
    endTime?: string;
    language: string;
};

// Server action
export const addShow = async (showData: ShowData) => {
    try {
        // Here you can implement the logic to save the show in the database (via Prisma, etc.)
        const { movieId, screenId, startTime, language } = showData;

        const timeZone = 'Asia/Kathmandu';

        // Convert the startTime and endTime to UTC
        const utcStartTime = toZonedTime(startTime, timeZone);


        // Example Prisma query to save the show(adjust based on your schema)
        const show = await prisma.show.create({
            data: {
                movieId,
                screenId,
                language,
                startTime: utcStartTime.toISOString(),
            },
        });

        // Initialize the show seats
        await initializeShowSeats(show.id);

        return { success: true, message: "Show added successfully" };
    } catch (error) {
        console.error(error);

    }
};




async function initializeShowSeats(showId: string) {
    // Fetch the show and its associated screen
    const show = await prisma.show.findUnique({
        where: { id: showId },
        include: { screen: { include: { seats: true } } },
    })

    if (!show || !show.screen) {
        return // Show not found or seats already initialized
    }

    // Create ShowSeat entries for each seat in the screen
    const showSeats = show.screen.seats.map(seat => ({
        showId: show.id,
        seatId: seat.id,
        status: 'AVAILABLE' as SeatStatus,
    }))

    // Use a transaction to ensure all operations succeed or fail together
    await prisma.$transaction([
        prisma.showSeat.createMany({ data: showSeats }),



    ])
}



