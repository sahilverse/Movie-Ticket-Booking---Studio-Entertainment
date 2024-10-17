"use client"
import React from 'react';
import styles from './ComingSoon.module.css'

import Image from "next/image";


import { useRouter } from 'next/navigation';

import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";
import { MovieCardType } from '@/types/types';
import { motion } from 'framer-motion';
import { fadeInAnimationVariants } from '@/lib/motion';

const ComingSoon = () => {

    const router = useRouter();

    const [movies, setMovies] = React.useState<MovieCardType[]>([
        {
            id: 1, title: "RRR", imageUrl: rrrImage, duration: "2h 30m", releaseDate: "20 Sept 2024", slug: "rrr",
            genre: '',
            rating: ''
        },
        {
            id: 2, title: "Joker", imageUrl: jokerImage, duration: "2h 30m", releaseDate: "22 Sept 2024", slug: "joker",
            genre: '',
            rating: ''
        },
        {
            id: 3, title: "Kalki", imageUrl: kalkiImage, duration: "2h 30m", releaseDate: "30 Sept 2024", slug: "kalki",
            genre: '',
            rating: ''
        },
        {
            id: 4, title: "RRR", imageUrl: rrrImage, duration: "2h 30m", releaseDate: "20 Sept 2024", slug: "rrr",
            genre: '',
            rating: ''
        },
        {
            id: 5, title: "Joker", imageUrl: jokerImage, duration: "2h 30m", releaseDate: "22 Sept 2024", slug: "joker",
            genre: '',
            rating: ''
        },
        {
            id: 6, title: "Kalki", imageUrl: kalkiImage, duration: "2h 30m", releaseDate: "30 Sept 2024", slug: "kalki",
            genre: '',
            rating: ''
        },

    ]);
    return (
        <section className={styles.container}>
            <p>Coming Soon</p>

            <div className={styles.card_container}>
                {movies.map((movie, index) => (

                    <motion.div
                        variants={fadeInAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={index}
                        key={movie.id} className={styles.card} onClick={() => router.push(`movie-details/${movie.slug}`)}>
                        <Image src={movie.imageUrl} alt={movie.title} loading='lazy' className={styles.image} />
                        <p className={styles.release_date}>{movie.releaseDate}</p>

                    </motion.div>

                ))}

            </div>


        </section>
    )
}

export default ComingSoon;