import React from 'react';
import styles from './ComingSoon.module.css'

import Image from "next/image";
import { MovieCardType } from "@/types/types";

import { useRouter } from 'next/navigation';

import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";

const ComingSoon = () => {

    const router = useRouter();

    const [movies, setMovies] = React.useState<MovieCardType[]>([
        { _id: 1, title: "RRR", imageUrl: rrrImage, duration: "2h 30m", releaseDate: "20 Sept 2024" },
        { _id: 2, title: "Joker", imageUrl: jokerImage, duration: "2h 30m", releaseDate: "22 Sept 2024" },
        { _id: 3, title: "Kalki", imageUrl: kalkiImage, duration: "2h 30m", releaseDate: "30 Sept 2024" },
    ]);
    return (
        <div className={styles.container}>
            <p>Coming Soon</p>

            <div className={styles.card_container}>
                {movies.map((movie) => (
                    <div key={movie._id} className={styles.card} onClick={() => router.push(`/coming-soon/${movie._id}`)}>
                        <Image src={movie.imageUrl} alt={movie.title} loading='lazy' className={styles.image} />
                        <p className={styles.release_date}>{movie.releaseDate}</p>

                    </div>
                ))}

            </div>


        </div>
    )
}

export default ComingSoon;