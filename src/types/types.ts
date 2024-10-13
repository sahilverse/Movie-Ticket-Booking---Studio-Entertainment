import { StaticImageData } from 'next/image';


export interface MovieCardType {
    id: string | number;
    imageUrl: StaticImageData | string;
    title: string;
    duration: string;
    releaseDate?: string;
}
