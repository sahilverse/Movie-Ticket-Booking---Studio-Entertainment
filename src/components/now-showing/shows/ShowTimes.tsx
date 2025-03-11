"use client"
import { toZonedTime } from "date-fns-tz"
import { formatShowsTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import type { MovieCardType } from "@/types/types"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import type { Show } from "@prisma/client"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShowTimesProps {
    movie: MovieCardType
}

export default function ShowTimes({ movie }: ShowTimesProps) {
    const router = useRouter()
    const { user } = useCurrentUser()
    const searchParams = useSearchParams()
    const [openPopover, setOpenPopover] = useState<string | null>(null)

    // Get unique languages from shows
    const languages = Array.from(new Set(movie.shows?.map((show) => show.language) || []))

    // Group shows by language and time
    const groupedShowsByLanguage = movie.shows?.reduce(
        (acc, show) => {
            if (!acc[show.language]) {
                acc[show.language] = {}
            }

            const timeKey = formatShowsTime(show.startTime)
            if (!acc[show.language][timeKey]) {
                acc[show.language][timeKey] = []
            }

            acc[show.language][timeKey].push(show)
            return acc
        },
        {} as Record<string, Record<string, Show[]>>,
    )

    // Handle Show Time Click
    const handleShowTimeClick = (show: Show) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("showId", show.id)

        if (user) {
            router.push(`/movie-details/${movie.slug}?${params.toString()}`)
        } else {
            router.push("/login")
        }
    }

    if (!languages.length) {
        return <div className="text-muted-foreground text-sm">No shows available</div>
    }

    return (
        <Tabs defaultValue={languages[0]} className="w-full ">
            <TabsList className="mb-4 bg-[#1f1f1f] border-[#373737]">
                {languages.map((language) => (
                    <TabsTrigger key={language} value={language} className="text-xs">
                        {language}
                    </TabsTrigger>
                ))}
            </TabsList>

            {languages.map((language) => (
                <TabsContent key={language} value={language}>
                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                        {Object.entries(groupedShowsByLanguage?.[language] || {}).map(([timeKey, shows]) => {
                            const timeZone = "Asia/Kathmandu"
                            const showTime = toZonedTime(shows[0].startTime, timeZone)
                            const isAvailable = showTime > new Date()
                            const hasMultipleShows = shows.length > 1

                            if (!hasMultipleShows) {
                                return (
                                    <Button
                                        key={timeKey}
                                        variant="outline"
                                        className={`text-xs bg-[#373737] border-transparent hover:border-[#efae26] hover:text-white ${isAvailable
                                            ? "hover:bg-[#373737]"
                                            : "bg-[#201f1fc3] hover:cursor-not-allowed hover:bg-[#201f1fc3] hover:border-transparent text-gray-400 hover:text-gray-400"
                                            }`}
                                        onClick={() => {
                                            if (isAvailable) {
                                                handleShowTimeClick(shows[0])
                                            }
                                        }}
                                        disabled={!isAvailable}
                                    >
                                        {timeKey}
                                    </Button>
                                )
                            }

                            return (
                                <Popover
                                    key={timeKey}
                                    open={openPopover === `${language}-${timeKey}`}
                                    onOpenChange={(open) => setOpenPopover(open ? `${language}-${timeKey}` : null)}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`text-xs bg-[#373737] border-transparent hover:border-[#efae26] hover:text-white ${isAvailable
                                                ? "hover:bg-[#373737]"
                                                : "bg-[#201f1fc3] hover:cursor-not-allowed hover:bg-[#201f1fc3] hover:border-transparent text-gray-400 hover:text-gray-400"
                                                }`}
                                            disabled={!isAvailable}
                                        >
                                            {timeKey}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-2 bg-[#1f1f1f] border-[#373737]">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs text-gray-400 mb-1">Select a screen:</p>
                                            {shows.map((show) => (
                                                <Button
                                                    key={show.id}
                                                    variant="outline"
                                                    size="sm"
                                                    className={`text-xs bg-[#373737] border-transparent text-white hover:border-[#efae26] hover:text-white ${isAvailable
                                                        ? "hover:bg-[#373737]"
                                                        : "bg-[#201f1fc3] hover:cursor-not-allowed hover:bg-[#201f1fc3] hover:border-transparent text-gray-400 hover:text-gray-400"
                                                        }`}
                                                    disabled={!isAvailable}
                                                    onClick={() => {
                                                        handleShowTimeClick(show)
                                                        setOpenPopover(null)
                                                    }}
                                                >
                                                    {/* @ts-ignore */}
                                                    {`Screen ${show.screen.name}`}
                                                </Button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        })}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}

