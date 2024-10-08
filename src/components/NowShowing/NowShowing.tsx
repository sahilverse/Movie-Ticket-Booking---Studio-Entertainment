"use client"
import React from 'react';
import styles from './NowShowing.module.css';

import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";
import MovieCard from './card/MovieCard';

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
    const [activeIndex, setActiveIndex] = React.useState<number>(0);


    // State to hold the list of movies for each date
    const moviesByDate = {
        today: [
            { id: 1, title: "RRR", imageUrl: rrrImage, duration: "2h 30m" },
            { id: 2, title: "Joker", imageUrl: jokerImage, duration: "2h 30m" },
            { id: 11, title: "RRR", imageUrl: rrrImage, duration: "2h 30m" },
            { id: 12, title: "Joker", imageUrl: jokerImage, duration: "2h 30m" },
            { id: 13, title: "RRR", imageUrl: rrrImage, duration: "2h 30m" },
            { id: 14, title: "Joker", imageUrl: jokerImage, duration: "2h 30m" },
        ],
        tomorrow: [
            { id: 3, title: "Kalki", imageUrl: kalkiImage, duration: "2h 30m" },
            { id: 4, title: "Inception", imageUrl: rrrImage, duration: "2h 28m" },
        ],
        "3 Oct": [
            { id: 5, title: "Avatar", imageUrl: jokerImage, duration: "2h 45m" },
            { id: 6, title: "Titanic", imageUrl: kalkiImage, duration: "3h 15m" },
        ],
        "4 Oct": [
            { id: 7, title: "Spider-Man", imageUrl: rrrImage, duration: "2h 15m" },
            { id: 8, title: "Interstellar", imageUrl: jokerImage, duration: "2h 49m" },
        ],
        "5 Oct": [
            { id: 9, title: "The Dark Knight", imageUrl: kalkiImage, duration: "2h 32m" },
            { id: 10, title: "Shutter Island", imageUrl: rrrImage, duration: "2h 18m" },
        ],
    };


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
                    <MovieCard url="now-showing" movies={moviesByDate.today} />
                </div>
            )}

            {activeIndex === 1 && (
                <div className="tomorrow">
                    <MovieCard url="coming-soon" movies={moviesByDate.tomorrow} />
                </div>
            )}
            {activeIndex === 2 && (
                <div className="3-oct">
                    <MovieCard url="coming-soon" movies={moviesByDate["3 Oct"]} />
                </div>
            )}
            {activeIndex === 3 && (
                <div className="4-oct">
                    <MovieCard url="coming-soon" movies={moviesByDate["4 Oct"]} />
                </div>
            )}
            {activeIndex === 4 && (
                <div className="5-oct">
                    <MovieCard url="coming-soon" movies={moviesByDate["5 Oct"]} />
                </div>
            )}
        </>
    );
};

export default NowShowing;
