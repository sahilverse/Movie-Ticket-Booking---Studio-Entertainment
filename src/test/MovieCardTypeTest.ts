
// potraitImageUrl
import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";
import { MovieCardType } from "@/types/types";

// landscapeImageUrl
import rrrImageLand from '@/assets/Slider/rrr.jpg';
import jokerImageLand from '@/assets/Slider/joker.jpg';

const mockMovies = [
    {
        id: "1",
        potraitImageUrl: rrrImage,
        landscapeImageUrl: rrrImageLand,
        title: "RRR",
        duration: "2h 32m",
        releaseDate: new Date("2008-07-18"),
        trailerUrl: 'https://www.youtube.com/embed/GY4BgdUSpbE',
        slug: "RRR",
        genre: "Action, Drama",
        shows: [
            {
                startTime: new Date('2024-11-06T14:00:00'),
                endTime: new Date('2024-11-06T16:32:00'),
                screen: {
                    name: "Screen 1"
                }
            },
            {
                startTime: new Date('2024-11-06T22:00:00'),
                endTime: new Date('2024-11-06T21:32:00'),
                screen: {
                    name: "Screen 2"
                }
            }
        ],
        rating: "PG"
    },
    {
        id: "2",
        potraitImageUrl: jokerImage,
        landscapeImageUrl: jokerImageLand,
        title: "Joker",
        duration: "2h 28m",
        trailerUrl: 'https://www.youtube.com/embed/_OKAwz2MsJs?si=RVkyG0prRom1VXh5',
        releaseDate: new Date("2010-07-16"),
        slug: "Joker",
        genre: "Sci-Fi, Thriller",
        shows: [
            {
                startTime: new Date('2024-11-06T12:30:00'),
                screen: {
                    name: "Screen 3"
                }
            },
            {
                startTime: new Date('2024-11-07T16:30:00'),
                screen: {
                    name: "Screen 1"
                }
            }
        ],
        rating: "PG-13"
    },
    {
        id: "3",
        potraitImageUrl: kalkiImage,
        title: "Interstellar",
        duration: "2h 49m",
        releaseDate: new Date("2014-11-07"),
        slug: "interstellar",
        genre: "Sci-Fi, Adventure",
        shows: [
            {
                startTime: new Date('2024-11-06T13:00:00'),
                screen: {
                    name: "Screen 2"
                }
            },
            {
                startTime: new Date('2024-11-06T18:00:00'),
                screen: {
                    name: "Screen 3"
                }
            }
        ],
        rating: "PG-13"
    },
    {
        id: "4",
        potraitImageUrl: rrrImage,
        title: "RRR",
        duration: "2h 50m",
        releaseDate: new Date("2022-03-25"),
        slug: "rrr",
        genre: "Action, Drama",
        shows: [],
        rating: "PG"
    }
];

export default mockMovies;