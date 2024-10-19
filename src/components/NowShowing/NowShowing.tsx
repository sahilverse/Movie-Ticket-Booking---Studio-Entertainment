"use client"
import React, { useState } from 'react';
import styles from './NowShowing.module.css';

import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";
import MovieCard from './card/MovieCard';
import { showTime } from '@/types/types';
// Function to generate an array of dates
const getDateArray = () => {
    const dateArray = [];
    const today = new Date();

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
    };

    dateArray.push("Today");

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dateArray.push("Tomorrow");

    for (let i = 2; i <= 4; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const formattedDate = formatDate(nextDate);
        dateArray.push(formattedDate);
    }

    return dateArray;
};



const NowShowing = () => {
    const dates = getDateArray();
    const [activeIndex, setActiveIndex] = useState(0);

    const showtimes: showTime[] = [
        {
            time: '07:15 AM',
            isAvailable: false
        },
        {
            time: '10:15 AM',
            isAvailable: false
        },
        {
            time: '01:15 PM',
            isAvailable: false
        },
        {
            time: '03:15 PM',
            isAvailable: false
        },
        {
            time: '06:15 PM',
            isAvailable: true
        },
        {
            time: '09:45 PM',
            isAvailable: true
        },
    ]

    const movies = [
        {
            id: '1',
            title: 'RRR',
            duration: '2 Hours',
            genre: 'ACTION DRAMA THRILLER',
            imageUrl: rrrImage,
            showtimes,
            rating: 'PG',
            slug: 'rrr'
        },
        {
            id: '2',
            title: 'Kalki',
            duration: '2 Hours',
            genre: 'ACTION DRAMA THRILLER',
            imageUrl: kalkiImage,
            showtimes: [
                {
                    time: '07:15 AM',
                    isAvailable: false
                },
                {
                    time: '10:15 AM',
                    isAvailable: true
                },
            ],
            rating: 'PG',
            slug: 'kalki'
        },
        {
            id: '3',
            title: 'Joker',
            duration: '2 Hours 2 Mins',
            genre: 'ACTION',
            imageUrl: jokerImage,
            showtimes: [
                {
                    time: '07:15 AM',
                    isAvailable: true
                },
                {
                    time: '10:15 AM',
                    isAvailable: true
                },
                {
                    time: '01:15 PM',
                    isAvailable: true
                },
                {
                    time: '03:15 PM',
                    isAvailable: true
                },
                {
                    time: '06:15 PM',
                    isAvailable: true
                },
                {
                    time: '09:45 PM',
                    isAvailable: true
                },
            ],
            rating: 'PG',
            slug: 'joker'
        },
        {
            id: '4',
            title: 'Behuli From Meghauli',
            duration: '2 Hours 9 Mins',
            genre: 'SOCIAL, DRAMA',
            imageUrl: jokerImage,
            showtimes: [],
            rating: 'U',
            slug: 'behuli-from-meghauli'
        },
        {
            id: '5',
            title: 'Behuli From Meghauli',
            duration: '2 Hours 9 Mins',
            genre: 'SOCIAL, DRAMA',
            imageUrl: jokerImage,
            showtimes: [],
            rating: 'U',
            slug: 'behuli-from-meghauli'
        },
    ]



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
                                {date}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditionally render MovieCard based on the active date */}
            {activeIndex === 0 && (
                <div className="today">
                    <MovieCard movies={movies} />
                </div>
            )}

            {activeIndex === 1 && (
                <div className="tomorrow">
                    <MovieCard movies={[movies[1]]} />
                </div>
            )}
            {activeIndex === 2 && (
                <div className="3-oct">
                    <MovieCard movies={[movies[2]]} />
                </div>
            )}
            {activeIndex === 3 && (
                <div className="4-oct">
                    <MovieCard movies={[movies[3]]} />
                </div>
            )}
            {activeIndex === 4 && (
                <div className="5-oct">
                    <MovieCard movies={[movies[4]]} />
                </div>
            )}
        </>
    );
};


export default NowShowing;
