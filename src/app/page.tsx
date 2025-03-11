import React from 'react'

import { MovieCardType, SliderType } from '@/types/types'
import { prisma } from '@/lib/prisma'
import Slider from '@/components/Slider/Slider'
import NowShowing from '@/components/now-showing/NowShowing'
import ComingSoon from '@/components/coming-soon/ComingSoon'

async function getNowShowingMovies(): Promise<MovieCardType[]> {
  const movies = await prisma.movie.findMany({
    where: {
      shows: {
        some: {}
      }
    },
    include: {
      shows: {
        orderBy: {
          startTime: 'asc'
        },

        include: {
          screen: {
            select: {
              name: true
            }
          }
        }
      }
    },
  });
  return movies;
}

async function getSliderMovies(): Promise<SliderType[]> {
  const movies = await prisma.movie.findMany({
    where: {
      isFeature: true,
      landscapeImageUrl: {
        not: null
      }
    }
  })

  return movies.map(movie => ({
    ...movie,
    landscapeImageUrl: movie.landscapeImageUrl as string,
  }));
}

async function getComingSoonMovies(): Promise<MovieCardType[]> {
  const movies = await prisma.movie.findMany({
    where: {
      shows: {
        none: {},
      },
    },

  });
  return movies;
}

export default async function Home() {
  const [nowShowingMovies, sliderMovies, comingSoonMovies] = await Promise.all([
    getNowShowingMovies(),
    getSliderMovies(),
    getComingSoonMovies(),
  ])


  return (
    <main className="main_container mt-8">
      <Slider movies={sliderMovies} />
      <NowShowing movies={nowShowingMovies} />
      <ComingSoon movies={comingSoonMovies} />
    </main>
  )
}