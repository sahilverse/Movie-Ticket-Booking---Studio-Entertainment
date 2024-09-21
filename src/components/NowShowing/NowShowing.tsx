import React from 'react';
import styles from './NowShowing.module.css';
import MovieCard from './card/MovieCard';
import { MovieCardType } from '@/types/types';

import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";


// Function to generate an array of dates
const getDateArray = () => {


    const dateArray = [];
    const today = new Date();

    // Helper function to format date as "day month"
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
    const dates = getDateArray(); // Get the array of dates
    const [activeIndex, setActiveIndex] = React.useState<number>(0); // State to track the active date index

    // State to hold the list of movies
    const [movies, setMovies] = React.useState<MovieCardType[]>([
        { _id: 1, name: "RRR", imageUrl: rrrImage, playTime: "2h 30m" },
        { _id: 2, name: "Joker", imageUrl: jokerImage, playTime: "2h 30m" },
        { _id: 3, name: "Kalki", imageUrl: kalkiImage, playTime: "2h 30m" },
        { _id: 4, name: "RRR", imageUrl: rrrImage, playTime: "2h 30m" },
        { _id: 5, name: "Joker", imageUrl: jokerImage, playTime: "2h 30m" },
        { _id: 6, name: "Kalki", imageUrl: kalkiImage, playTime: "2h 30m" },
        { _id: 7, name: "RRR", imageUrl: rrrImage, playTime: "2h 30m" },
        { _id: 8, name: "Joker", imageUrl: jokerImage, playTime: "2h 30m" },
        { _id: 9, name: "Kalki", imageUrl: kalkiImage, playTime: "2h 30m" },
        { _id: 10, name: "RRR", imageUrl: rrrImage, playTime: "2h 30m" },
        { _id: 11, name: "Joker", imageUrl: jokerImage, playTime: "2h 30m" },
        { _id: 12, name: "Kalki", imageUrl: kalkiImage, playTime: "2h 30m" },
    ]);

    return (
        <>
            <div className={styles.container}>
                <p>Now Showing</p>
                <div className={styles.date_container}>
                    {dates.map((date, index) => (
                        <p
                            key={index}
                            className={`date_item ${index === activeIndex ? styles.active : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {date}
                        </p>
                    ))}
                </div>
            </div>

            {/* Conditionally render MovieCard based on the active date */}
            {activeIndex === 0 && (
                <div className="today">
                    <MovieCard url="now-showing" movies={movies} />
                </div>
            )}

            {activeIndex === 1 && (
                <div className="tomorrow">
                    <MovieCard url="coming-soon" movies={movies} />
                </div>
            )}
            {/* Work Remain : Refactor need 3 more nav buttons */}
            {activeIndex >= 2 && activeIndex <= 4 && (
                <div className="future">
                    <MovieCard url="coming-soon" movies={movies} />
                </div>
            )}
        </>
    );
};

export default NowShowing;
