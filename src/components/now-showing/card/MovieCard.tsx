'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { Badge } from '@/components/ui/badge'
import { MovieCardType } from '@/types/types'

import styles from './MovieCard.module.css'

import { motion } from 'framer-motion'
import { fadeInAnimationVariants } from '@/lib/motion'
import NoShowsAvailable from '@/components/extras/NoShowsAvailable'


import ShowTimes from '../shows/ShowTimes'


interface MovieCardProps {
    movies?: MovieCardType[]
}


export default function MovieCard({ movies }: MovieCardProps) {
    const router = useRouter()


    if (!movies || movies.length === 0) {
        return (
            <NoShowsAvailable />
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto mt-10">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="relative"
            >
                <CarouselContent >

                    {movies?.map((movie, index) =>

                    (

                        <CarouselItem key={movie.id} className="pl-2 sm:pl-4 basis-1/2  sm:basis-1/3 md:basis-1/4">
                            <motion.div className="bg-navy-800 text-white overflow-hidden h-full flex flex-col"
                                variants={fadeInAnimationVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={index}
                            >
                                <div className="relative aspect-[2/3] w-full">
                                    <Image
                                        alt={movie.title}
                                        className="object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                                        src={movie.potraitImageUrl}
                                        fill
                                        sizes="(max-width: 375px) 100vw, (max-width: 768px) 33vw, 25vw"
                                        onClick={() => router.push(`movie-details/${movie.slug}`)}

                                    />
                                    <Badge className="absolute top-2 right-2 bg-white text-black hover:bg-white hover:cursor-default">
                                        {movie.rating}
                                    </Badge>
                                </div>
                                <div className='flex flex-col gap-2 mt-4 pl-2 flex-grow'>
                                    <h2 className={`text-base sm:text-lg font-bold truncate ${styles.movie_title}`}>{movie.title}</h2>
                                    <p className={`text-xs sm:text-sm text-gray-400 ${styles.movie_duration}`}>{movie.duration}</p>


                                    <p className={`text-xs text-gray-500 ${styles.movie_genre}`} key={index}>{movie.genre.join(", ")}</p>
                                    <ShowTimes movie={movie} />

                                </div>
                            </motion.div>
                        </CarouselItem>

                    )
                    )}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-1/2 text-white bg-black/50 " />
                <CarouselNext className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-1/2 text-white bg-black/50 " />
            </Carousel>
        </div>
    )
}