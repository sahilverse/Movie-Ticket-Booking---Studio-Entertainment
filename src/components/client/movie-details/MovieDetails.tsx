'use client'

import { Card, CardContent } from '@/components/ui/card';
import { Movie } from '@prisma/client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import Detail from './Detail';
import Icon from './Icon';
import { Button } from '@/components/ui/button';

const MovieDetails = ({ movie }: { movie: Movie }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const releaseDate = new Date(movie.releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const checkOverflow = () => {
            if (descriptionRef.current) {
                const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
                setShowReadMore(isOverflowing);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => window.removeEventListener('resize', checkOverflow);
    }, [movie.description]);

    return (
        <section className="container mx-auto px-4 py-8" id="details_container">
            <Card className="bg-glass border-none text-white">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        <div className="relative aspect-[2/3] w-full max-w-[320px] mx-auto lg:mx-0">
                            <Image
                                alt={movie.title + " poster"}
                                className="object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                                src={movie.potraitImageUrl}
                                fill
                                sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <div className="flex-1 md:pt-5">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-wider font-poppins">{movie.title}</h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {movie.genre.map((genre, index) => (
                                    <Badge key={index} className="bg-gray-200 text-gray-800 hover:bg-gray-200 font-roboto tracking-wider">{genre}</Badge>
                                ))}
                            </div>
                            <div className="mb-4">
                                <p
                                    ref={descriptionRef}
                                    className={`text-gray-400 text-sm font-roboto tracking-wider leading-6 ${isExpanded ? '' : 'line-clamp-3'}`}
                                >
                                    {movie.description}
                                </p>
                                {showReadMore && (
                                    <Button
                                        variant="link"
                                        className="h-auto p-0 text-indigo-400 hover:text-indigo-300 bg-transparent"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? 'Read Less' : 'Read More'}
                                    </Button>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 text-sm mb-6">
                                <Icon Icon={Calendar} text={releaseDate} title="Release Date" />
                                <Icon Icon={Clock} text={movie.duration} title="Duration" />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Detail detailOf="Director" text={movie.director!} />
                                <Detail detailOf="Cast" text={movie.cast.join(", ")} />
                                {movie.language && <Detail detailOf="Language" text={movie.language!} />}
                                {movie.rating && <Detail detailOf="Rating" text={movie.rating!} />}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default MovieDetails;
