import { StaticImageData } from 'next/image';

export interface AdminType {
    _id: number | string;
    name: string;
    email: string;
    profileImage: StaticImageData | string;
}

export interface UserType {
    _id: number | string;
    name: string;
    email: string;
    profileImage: StaticImageData | string;
    bookings: BookingType[];
    city: string;
}

export interface BookingType {
    _id: number | string;
    userID: number | string;
    movieID: number | string;
    showTime: string;
    seats: SeatType[];
}

export interface SeatType {
    _id: number | string;
    col: number;
    row: number;
    price: number;
    isBooked: boolean;
    bookingID?: number | string;
    booking?: BookingType;
    screenID: number | string;
    screen: ScreenType;
    movieScheduleID: number | string;
    movieSchedule: MovieScheduleType;
}

export interface MovieType {
    _id: number | string;
    title: string;
    description: string;
    portraitImageUrl: StaticImageData | string;
    landscapeImageUrl: StaticImageData | string;
    rating: number;
    genre: string[];
    duration: string;
    cast: string[];
    crew: string[];
    movieSchedule: MovieScheduleType[];
    releaseDate: string;
    trailerUrl: string;
}

export interface MovieScheduleType {
    _id: number | string;
    showTime: string;
    showDate: string;
    movieID: number | string;
    movie: MovieType;
    screenID: number | string;
    screen: ScreenType;
    notAvailableSeats: SeatType[];
}

export interface ScreenType {
    _id: number | string;
    name: string;
    seats: SeatType[];
    city: string;
    movieSchedule: MovieScheduleType[];
}

export interface MovieCardType {
    _id: number | string;
    imageUrl: StaticImageData | string;
    title: string;
    duration: string;
    releaseDate?: string;
}
