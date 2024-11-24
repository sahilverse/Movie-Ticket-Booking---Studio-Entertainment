import NoShowsAvailable from "@/components/extras/NoShowsAvailable";
import { prisma } from "@/lib/prisma";
import React from "react";



const MovieDetails = async ({ params }: { params: { slug: string } }) => {

    const { slug } = params;

    const movie = await prisma.movie.findFirst({
        where: {
            slug
        },
        include: {
            shows: true
        }
    });

    return (
        <div className="main_container">

            <div className="movie_details">
                <h1>{movie?.title}</h1>
                <p>{movie?.description}</p>
            </div>

            <div className="shows">
                {movie?.shows.length ? movie?.shows.map(show => (
                    <div key={show.id} className="show">


                    </div>
                )) : <NoShowsAvailable />}

            </div>

        </div>
    );
};

export default MovieDetails;
