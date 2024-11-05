import { prisma } from "@/lib/prisma";
import React from "react";



const MovieDetails = async ({ params }: { params: { slug: string } }) => {

    const { slug } = params;

    const movie = await prisma.movie.findFirst({
        where: {
            slug
        }
    });

    return (
        <section className="main_container mt-24">
            <div className="flex items-center justify-center w-full bg-yellowShade p-10 rounded-lg backdrop-blur-md">
                <p className="font-bold tracking-wider text-black text-lg font-poppins">No Shows Available</p>
            </div>

            <p className="text-red-500 font-poppins">This is the Slug: {slug}</p>
        </section>
    );
};

export default MovieDetails;
