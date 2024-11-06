"use client"

import React, { useState } from 'react';
import styles from './NowShowing.module.css';
import MovieCard from './card/MovieCard';


import { MovieCardType } from '@/types/types';


export default function NowShowing({ movies }: { movies: MovieCardType[] }) {
    const today = new Date();
    const dates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        return date;
    });

    const [activeIndex, setActiveIndex] = useState(0);

    const formatDateDisplay = (date: Date) => {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        }
        if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        }
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        return `${day} ${month}`;
    };



    const filteredMovies = movies.filter(movie =>
        movie.shows?.some(show =>
            new Date(show.startTime).toDateString() === dates[activeIndex].toDateString()
        )
    );

    return (
        <>
            <section className={styles.container}>
                <p>Now Showing</p>
                <div className={styles.date_container_wrapper}>
                    <div className={styles.date_container}>
                        {dates.map((date, index) => (
                            <p
                                key={index}
                                className={`${styles.date_item} ${index === activeIndex ? styles.active : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {formatDateDisplay(date)}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <div>
                <MovieCard movies={filteredMovies} />
            </div>
        </>
    );
}