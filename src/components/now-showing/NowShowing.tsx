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

        if (date.toISOString() === today.toISOString()) {
            return "Today";
        }
        if (date.toISOString() === tomorrow.toISOString()) {
            return "Tomorrow";
        }
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.toLocaleDateString('en-US', { day: 'numeric' });
        return `${day} ${month}`;
    };



    const filteredMovies = movies?.filter(movie =>
        movie.shows?.some(show => {
            const showTime = new Date(show.startTime);
            const selectedDate = dates[activeIndex];

            // Reset hours to compare just the dates
            const showDate = new Date(showTime.getFullYear(), showTime.getMonth(), showTime.getDate());
            const compareDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

            return showDate.getTime() === compareDate.getTime();
        })
    ).map(movie => ({
        ...movie,
        // Filter shows to only include those for the selected date
        shows: movie.shows?.filter(show => {
            const showTime = new Date(show.startTime);
            const selectedDate = dates[activeIndex];

            const showDate = new Date(showTime.getFullYear(), showTime.getMonth(), showTime.getDate());
            const compareDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

            return showDate.getTime() === compareDate.getTime();
        })
    }));



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