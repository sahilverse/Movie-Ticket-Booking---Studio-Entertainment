"use client"
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import rrrImage from '@/assets/Slider/rrr.jpg';
import Image, { StaticImageData } from 'next/image';
import jokerImage from '@/assets/Slider/joker.jpg';

import styles from './Slider.module.css';

import { IoTicketOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";

import Link from 'next/link';

import TrailerPopup from '../popups/trailer/TrailerPopup';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

interface Banner {
    id: number | string;
    imageUrl: StaticImageData | string;
    name: string;
    tailorUrl?: string;
}

export default function Slider() {

    const [showTrailer, setShowTrailer] = useState<boolean>(false);
    const [currentTrailer, setCurrentTrailer] = useState<string>('');

    const openTrailer = (trailerUrl: string) => {
        if (trailerUrl) {
            setCurrentTrailer(trailerUrl);
            setShowTrailer(true);
        }
    };
    const [banners, setBanners] = useState<Banner[]>([
        {
            id: 1,
            imageUrl: jokerImage,
            name: 'Joker',
            tailorUrl: 'https://www.youtube.com/embed/_OKAwz2MsJs?si=RVkyG0prRom1VXh5'

        },
        {
            id: 2,
            imageUrl: rrrImage,
            name: 'RRR',
            tailorUrl: 'https://www.youtube.com/embed/GY4BgdUSpbE'
        },
    ]);

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    });

    // hook to handle window dimensions
    React.useEffect(() => {
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
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                {/* Image sliders */}
                {
                    banners.map((banner) => (
                        <SwiperSlide key={banner.id}>
                            <div className='relative'>
                                <Image
                                    src={banner.imageUrl}
                                    alt={`Image of ${banner.name}`}
                                    width={windowSize.width}
                                    height={windowSize.height}
                                    className='rounded-lg'
                                    priority={true}
                                />
                                <div className={styles.details_container}>
                                    <p className={styles.banner_name}>{banner.name}</p>
                                    <div className='flex sm:gap-[50px] sm:flex-row flex-col'>
                                        <Link className={styles.book_ticket_button} href={`/booking/${banner.name}`}>
                                            <span><IoTicketOutline className='text-xl text-[#000]' /></span>
                                            <span>Book Tickets</span>
                                        </Link>
                                        <a className={`${styles.watch_trailer_button} cursor-pointer`} onClick={
                                            () => {
                                                openTrailer(banner.tailorUrl as string);
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
