import { BookingStatus, Movie, PaymentMethod, Seat, Show, ShowSeat, Ticket } from '@prisma/client';
import { StaticImageData } from 'next/image';



export type TStyle = Record<string, string>;

export interface MovieCardType {
    id: string;
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
    id: string;
    landscapeImageUrl: StaticImageData | string;
    title: string;
    trailerUrl?: string | null;
    slug: string;
}

export interface MovieWithShowsandScreen extends Movie {
    shows: Show[] & {
        screen: {
            name: string;
        }
    }[]
}


export interface MovieWithShowsAndSeats extends Movie {
    shows: Show[] &
    {
        screen: {
            name?: string;
            seats: Seat[]
        }
    }[]
}


export interface ShowWithSeats extends Show {
    screen: {
        name?: string;
        seats: Seat[]
    }
}


export interface EsewaConfigData {
    amount: string;
    tax_amount: string;
    total_amount: string;
    transaction_uuid: string;
    product_code: string;
    product_service_charge: string;
    product_delivery_charge: string;
    success_url: string;
    failure_url: string;
    signed_field_names: string;
    signature: string;
}

export interface EsewaResponse {
    amount: string;
    esewaConfig: EsewaConfigData;
}


export interface PaymentRequestData {
    bookingId: string;
    method: PaymentMethod;
}

export interface PaymentResponse {
    transaction_code: string;
    status: string
    total_amount: number;
    transaction_uuid: string;
    product_code: string;
    signed_field_names: string;
    signature: string;
    [key: string]: any;
}


export interface ShowSeatWithSeat extends ShowSeat {
    seat: Seat
}

export interface BookingWithDetails {
    id: string
    status: BookingStatus
    amount: number
    show: {
        startTime: Date | string
        movie: {
            title: string
        }
        screen: {
            name: string
        }
    }
    ShowSeat: ShowSeatWithSeat[]
    Ticket: Ticket[]
}




