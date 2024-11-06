import NoShowsAvailable from "@/components/extras/NoShowsAvailable";
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
        <div className="main_container">

            <NoShowsAvailable />
        </div>
    );
};

export default MovieDetails;
