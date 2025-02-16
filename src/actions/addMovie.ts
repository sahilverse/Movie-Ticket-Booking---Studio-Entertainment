"use server"
// app/actions/addMovie.js

import { prisma } from "@/lib/prisma";


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
        await prisma.show.create({
            data: {
                movieId,
                screenId,
                language,
                startTime: utcStartTime.toISOString(),
            },
        });

        return { success: true, message: "Show added successfully" };
    } catch (error) {
        console.error(error);

    }
};




