"use client"
import React from 'react';
import styles from './ComingSoon.module.css'

import Image from "next/image";


import { useRouter } from 'next/navigation';

import { MovieCardType } from '@/types/types';
import { motion } from 'framer-motion';
import { fadeInAnimationVariants } from '@/lib/motion';

const ComingSoon = ({ movies }: { movies: MovieCardType[] }) => {


    const router = useRouter();
    const formatDate = (date: Date) => {
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };


    return (
        <section className={styles.container}>
            <p>Coming Soon</p>

            <div className={styles.card_container}>
                {movies?.map((movie, index) => (

                    <motion.div
                        variants={fadeInAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={index}
                        key={movie.id} className={styles.card} onClick={() => router.push(`movie-details/${movie.slug}`)}>
                        <Image src={movie.potraitImageUrl} alt={movie.title} loading='lazy' className={styles.image}
                            width={200} height={300}
                        />
                        <p className={styles.release_date}>{formatDate(movie.releaseDate)}</p>

                    </motion.div>

                ))}

            </div>


        </section>
    )
}

export default ComingSoon;