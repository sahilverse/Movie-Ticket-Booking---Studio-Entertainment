"use client"
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import styles from './Slider.module.css';

import { IoTicketOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";

import Link from 'next/link';

import TrailerPopup from '../popups/trailer/TrailerPopup';
import { SliderType } from '@/types/types';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';




export default function Slider({ movies }: { movies: SliderType[] }) {

    const [showTrailer, setShowTrailer] = useState(false);
    const [currentTrailer, setCurrentTrailer] = useState('');

    const openTrailer = (trailerUrl: string) => {
        if (trailerUrl) {
            setCurrentTrailer(trailerUrl);
            setShowTrailer(true);
        }
    };


    const [windowSize, setWindowSize] = useState({
        width: 1277,
        height: 898
    });

    // hook to handle window dimensions
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <section>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: true,
                }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                {/* Image sliders */}
                {
                    movies?.map((banner) => (
                        <SwiperSlide key={banner.id}>
                            <div className='relative'>
                                <Image
                                    src={banner.landscapeImageUrl}
                                    alt={`Image of ${banner.title}`}
                                    width={windowSize.width}
                                    height={windowSize.height}
                                    className='rounded-lg'
                                    priority

                                />
                                <div className={styles.details_container}>
                                    <p className={styles.banner_name}>{banner.title}</p>
                                    <div className='flex sm:gap-[50px] sm:flex-row flex-col'>
                                        <Link className={styles.book_ticket_button} href={`/movie-details/${banner.slug}`}>
                                            <span><IoTicketOutline className='text-xl text-[#000]' /></span>
                                            <span>Book Tickets</span>
                                        </Link>
                                        <a className={`${styles.watch_trailer_button} cursor-pointer`} onClick={
                                            () => {
                                                openTrailer(banner.trailerUrl as string);
                                            }
                                        }>
                                            <span><IoPlayOutline className='text-xl text-[#000] ml-[2px]' /></span>
                                            <span>Watch Trailer</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {
                showTrailer && <TrailerPopup src={currentTrailer} setShowTrailer={setShowTrailer} />
            }
        </section>
    );
}
