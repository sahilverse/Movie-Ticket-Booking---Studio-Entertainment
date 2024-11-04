import { StaticImageData } from 'next/image';



export type TStyle = Record<string, string>;

export interface MovieCardType {
    id: string | number;
    imageUrl: StaticImageData | string;
    title: string;
    duration: string;
    releaseDate?: string;
    slug?: string;
    genre: string;
    showtimes?: showTime[];
    rating: string
}



export interface showTime {
    time: string;
    isAvailable: boolean;
}