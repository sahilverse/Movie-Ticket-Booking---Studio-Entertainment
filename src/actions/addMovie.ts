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


export const addShow = async (showData: ShowData) => {
    try {
        
        const { movieId, screenId, startTime, language } = showData;

        const timeZone = 'Asia/Kathmandu';

        
        const utcStartTime = toZonedTime(startTime, timeZone);


       
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
        return 
    }

 
    const showSeats = show.screen.seats.map(seat => ({
        showId: show.id,
        seatId: seat.id,
        status: 'AVAILABLE' as SeatStatus,
    }))

    
    await prisma.$transaction([
        prisma.showSeat.createMany({ data: showSeats }),



    ])
}



