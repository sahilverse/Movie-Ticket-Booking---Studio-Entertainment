"use client"

import React, { useRef, useState, useEffect } from 'react';
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
    const [visibleCards, setVisibleCards] = useState(4);
    const cardCount = movies.length;

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth;
            if (width < 375) {
                setVisibleCards(1);
            } else if (width < 768) {
                setVisibleCards(3);
            } else {
                setVisibleCards(4);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);

        return () => {
            window.removeEventListener('resize', updateVisibleCards);
        };
    }, []);

    const requiresScrolling = cardCount > visibleCards;

    const scrollLeft = () => {
        const container = movieSliderRef.current;
        if (container) {
            container.scrollLeft -= container.offsetWidth;
        }
    };

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
            {requiresScrolling && <FaChevronLeft className={styles.left_arrow} onClick={scrollLeft} />}
            <div id="movieSlider" className={styles.card_container} ref={movieSliderRef}>
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
            {requiresScrolling && <FaChevronRight className={styles.right_arrow} onClick={scrollRight} />}
        </div>
    );
};

export default MovieCard;