"use client"
import React, { useRef } from 'react';
import styles from './MovieCard.module.css';
import Image from 'next/image';
import { MovieCardType } from '@/types/types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


interface MovieCardProps {
    url: string;
    movies: MovieCardType[];
}

const MovieCard: React.FC<MovieCardProps> = ({ url, movies }) => {


    const router = useRouter();
    const movieSliderRef = useRef<HTMLDivElement | null>(null);
    const cardCount = movies.length;
    const requiresScrolling = cardCount > 4;

    // Function to scroll the movie slider to the left
    const scrollLeft = () => {
        const container = movieSliderRef.current;
        if (container) {
            container.scrollLeft -= container.offsetWidth;
        }
    };

    // Function to scroll the movie slider to the right
    const scrollRight = () => {
        const container = movieSliderRef.current;
        if (container) {
            const maxScroll = container.scrollWidth - container.offsetWidth;
            const newPosition = Math.min(maxScroll, container.scrollLeft + container.offsetWidth);
            container.scrollLeft = newPosition;
        }
    };

    return (
        <div className={styles.slider_container}>
            {/* Render left arrow if scrolling is required */}
            {requiresScrolling && <FaChevronLeft className={styles.left_arrow} onClick={scrollLeft} />}
            <div id="movieSlider" className={styles.card_container} ref={movieSliderRef}>
                {/* Render each movie card */}
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className={styles.card}
                        onClick={() => router.push(`city/${url}/${movie.id}`)}
                    >
                        <Image src={movie.imageUrl} alt={movie.title} className={styles.image} loading='lazy' />
                    </div>
                ))}
            </div>
            {/* Render right arrow if scrolling is required */}
            {requiresScrolling && <FaChevronRight className={styles.right_arrow} onClick={scrollRight} />}
        </div>
    );
};

export default MovieCard;
