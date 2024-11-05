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
        <NoShowsAvailable />
    );
};

export default MovieDetails;
