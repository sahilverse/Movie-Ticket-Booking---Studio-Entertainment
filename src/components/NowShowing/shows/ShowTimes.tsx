"use client"
import React from 'react'


import { toZonedTime } from 'date-fns-tz';
import { formatShowsTime } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'

import { MovieCardType } from '@/types/types'

interface ShowTimesProps {
    movie: MovieCardType
}

export default function ShowTimes({ movie }: ShowTimesProps) {
    const router = useRouter()
    return (
        <div className="grid grid-cols-2 gap-2 mt-4 xl:grid-cols-3">
            {movie.shows?.map((show, index) => {
                const timeZone = 'Asia/Kathmandu';
                const showTime = toZonedTime(show.startTime, timeZone);
                const isAvailable = showTime > new Date();

                return (
                    <Button key={index} variant="outline" className={`text-xs  bg-[#373737] border-transparent hover:border-[#efae26] hover:text-white ${isAvailable ? "hover:bg-[#373737]" : "bg-[#201f1fc3] hover:cursor-not-allowed hover:bg-[#201f1fc3] hover:border-transparent text-gray-400 hover:text-gray-400"}`}
                        {
                        ...isAvailable && {
                            onClick: () => router.push(`/booking/${movie.slug}/${show.id}`)
                        }
                        }
                    >
                        {formatShowsTime(show.startTime)}
                    </Button>
                )
            })}
        </div>
    )
}

