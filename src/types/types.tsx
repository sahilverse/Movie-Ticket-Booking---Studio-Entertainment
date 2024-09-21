import { StaticImageData } from 'next/image';

export interface MovieCardType {
    _id: number | string;
    imageUrl: StaticImageData | string;
    name: string;
    playTime: string;
    releaseDate?: string;

}