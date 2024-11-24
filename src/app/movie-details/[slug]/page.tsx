import React from "react";

import { prisma } from "@/lib/prisma";
import MovieDetails from "@/components/client/movie-details/MovieDetails";
import MovieNotFound from "@/components/client/movie-details/NotFound";


const MovieDetailsPage = async ({ params }: { params: { slug: string } }) => {

    const { slug } = params;

    const movie = await prisma.movie.findFirst({
        where: {
            slug
        },
        include: {
            shows: true
        }
    });


    if (!movie) return <MovieNotFound />



    return (
        <div className="main_container mt-6">
            <MovieDetails movie={movie} />
        </div>
    );
};


export default MovieDetailsPage;


