import { StaticImageData } from 'next/image';

export interface AdminType {
    id: string;
    name: string;
    email: string;
}

export interface UserType {
    id: string;
    name: string;
    email: string;
    bookings: BookingType[];
    city: string;

}

export interface BookingType {
    id: string;
    userID: string;
    movieID: string;
    showTime: string;
    seats: SeatType[];
    paymentID: string;
    paymentType: string;
}

export interface SeatType {
    id: string;
    col: number;
    row: number;
    price: number;
    isBooked: boolean;
    isReserved: boolean;
    bookingID?: string;
    booking?: BookingType;
    screenID: string;
    screen: ScreenType;
    movieScheduleID: string;
    movieSchedule: MovieScheduleType;
}

export interface MovieType {
    id: string;
    title: string;
    description: string;
    portraitImageUrl: StaticImageData | string;
    landscapeImageUrl: StaticImageData | string;
    rating: number;
    genre: string[];
    duration: string;
    cast: string[];
    director: string;
    movieSchedule: MovieScheduleType[];
    releaseDate: string;
    trailerUrl: string;
}

export interface MovieScheduleType {
    id: string;
    showTime: string;
    showDate: Date;
    movieID: string;
    movie: MovieType;
    screenID: string;
    screen: ScreenType;
    notAvailableSeats: SeatType[];
}

export interface ScreenType {
    id: string;
    name: string;
    seats: SeatType[];
    city: string;
    movieSchedule: MovieScheduleType[];
}

export interface MovieCardType {
    id: string;
    imageUrl: StaticImageData | string;
    title: string;
    duration: string;
    releaseDate?: string;
}
