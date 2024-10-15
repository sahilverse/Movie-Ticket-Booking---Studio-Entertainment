import { StaticImageData } from 'next/image';
import { User } from 'next-auth';


export type TStyle = Record<string, string>;

export interface MovieCardType {
    id: string | number;
    imageUrl: StaticImageData | string;
    title: string;
    duration: string;
    releaseDate?: string;
}

export type TUser = User | undefined;