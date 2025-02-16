// import { Show } from '@prisma/client';
import { Movie, Seat, Show } from '@prisma/client';
import { StaticImageData } from 'next/image';



export type TStyle = Record<string, string>;

export interface MovieCardType {
    id: string | number;
    potraitImageUrl: StaticImageData | string;
    landscapeImageUrl?: StaticImageData | string | null;
    title: string;
    duration: string;
    trailerUrl?: string | null;
    releaseDate: Date;
    slug: string;
    genre: string[];
    shows?: Show[];
    rating: string | null;
}

export interface SliderType {
    id: number | string;
    landscapeImageUrl: StaticImageData | string;
    title: string;
    trailerUrl?: string | null;
    slug: string;
}


export interface MovieWithShowsAndSeats extends Movie {
    shows: Show[] &
    {
        screen: {
            seats: Seat[]
        }
    }[]
}



