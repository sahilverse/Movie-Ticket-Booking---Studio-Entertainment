import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';

import { MovieCardType } from '@/types/types';
import MovieCard from './MovieCard';

import rrrImage from '@/assets/MovieCard/rrr.jpg';
import jokerImage from '@/assets/MovieCard/joker.jpg';
import kalkiImage from '@/assets/MovieCard/kalki.jpg';

const MovieCarousel = () => {
    const [movies, setMovies] = React.useState<MovieCardType[]>([
        {
            _id: '1',
            imageUrl: rrrImage,
            name: 'RRR',
            playTime: '2h 30m',
        },
        {
            _id: '2',
            imageUrl: jokerImage,
            name: 'Joker',
            playTime: '2h 30m',
        },
        {
            _id: '3',
            imageUrl: kalkiImage,
            name: 'Kalki',
            playTime: '2h 30m',
        },
    ]);

    return (
        <div className="sliderout">
            {movies && movies.length > 0 && (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10} // Default space between slides
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        // Mobile
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        // Tablet
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        // Small Desktop
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        // Large Desktop
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                        // Extra Large Desktop
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                        },
                        // Super Large Desktop
                        1536: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie._id}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default MovieCarousel;
