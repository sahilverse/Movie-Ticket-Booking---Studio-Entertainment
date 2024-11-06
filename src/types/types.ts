// import { Show } from '@prisma/client';
import { StaticImageData } from 'next/image';



export type TStyle = Record<string, string>;

export interface MovieCardType {
    id: string | number;
    potraitImageUrl: StaticImageData | string;
    landscapeImageUrl?: StaticImageData | string;
    title: string;
    duration: string;
    trailerUrl?: string;
    releaseDate: Date;
    slug?: string;
    genre: string;
    shows?: {
        startTime: Date;
        endTime?: Date;
        screen: {
            name: string;
        }
    }[];
    rating: string
}

export interface SliderType {
    id: number | string;
    landscapeImageUrl: StaticImageData | string;
    title: string;
    trailerUrl?: string;
}




