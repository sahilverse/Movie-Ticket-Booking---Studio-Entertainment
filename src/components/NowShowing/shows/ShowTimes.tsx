"use client"
import { toZonedTime } from "date-fns-tz"
import { formatShowsTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { MovieCardType } from "@/types/types"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import type { Show } from "@prisma/client"

interface ShowTimesProps {
    movie: MovieCardType
}

export default function ShowTimes({ movie }: ShowTimesProps) {
    const router = useRouter()
    const { user } = useCurrentUser()

    // Group shows by start time
    const groupedShows = movie.shows?.reduce(
        (acc, show) => {
            const timeKey = formatShowsTime(show.startTime)
            if (!acc[timeKey]) {
                acc[timeKey] = []
            }
            acc[timeKey].push(show)
            return acc
        },
        {} as Record<string, Show[]>,
    )

    return (
        <div className="grid grid-cols-2 gap-2 mt-4 xl:grid-cols-3">
            {Object.entries(groupedShows || {}).map(([timeKey, shows]) => {
                const timeZone = "Asia/Kathmandu"
                const showTime = toZonedTime(shows[0].startTime, timeZone)
                const isAvailable = showTime > new Date()

                return (
                    <Button
                        key={timeKey}
                        variant="outline"
                        className={`text-xs bg-[#373737] border-transparent hover:border-[#efae26] hover:text-white ${isAvailable
                            ? "hover:bg-[#373737]"
                            : "bg-[#201f1fc3] hover:cursor-not-allowed hover:bg-[#201f1fc3] hover:border-transparent text-gray-400 hover:text-gray-400"
                            }`}
                        onClick={() => {
                            if (isAvailable && user) {
                                // Pass all show IDs for this time slot to the booking page
                                const showIds = shows.map((s) => s.id).join(",")
                                router.push(`/booking/${movie.slug}/${showIds}`)
                            } else {
                                router.push("/login")
                            }
                        }}
                        disabled={!isAvailable}
                    >
                        {timeKey}
                    </Button>
                )
            })}
        </div>
    )
}

