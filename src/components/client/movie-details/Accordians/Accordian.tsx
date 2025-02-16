"use client"

import { useState, useEffect } from "react"
import { format, isSameDay, isPast } from "date-fns"
import { Calendar, Clock, Globe } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { Show } from "@prisma/client"
import type { MovieWithShowsAndSeats } from "@/types/types"
import SeatSelector from "./SeatSelector"


interface AccordianProps {
    movie: MovieWithShowsAndSeats
}

const Accordian = ({ movie }: AccordianProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedLanguage, setSelectedLanguage] = useState<string>("All")
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [activeAccordion, setActiveAccordion] = useState<string>("step-1")
    const [selectedShow, setSelectedShow] = useState<Show | null>(null)
    const [selectedSeats, setSelectedSeats] = useState<string[]>([])

    const today = new Date()
    const dates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        return date
    })

    useEffect(() => {
        setSelectedTime("")
        setSelectedShow(null)
    }, [selectedDate])

    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        if (selectedDate && selectedTime) {
            timeoutId = setTimeout(() => {
                setActiveAccordion("step-2")
            }, 1)
        } else {
            setActiveAccordion("step-1")
        }
        return () => clearTimeout(timeoutId)
    }, [selectedTime, selectedDate])

    const getAvailableShows = (date: Date) => {
        const filteredShows = movie.shows.filter((show) => isSameDay(new Date(show.startTime), date))
        const showsByLanguage = filteredShows.reduce(
            (acc, show) => {
                if (!acc[show.language]) {
                    acc[show.language] = []
                }
                acc[show.language].push(show)
                return acc
            },
            {} as Record<string, Show[]>,
        )

        return showsByLanguage
    }

    const canSelectSeats = selectedDate && selectedTime && selectedShow

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date)
    }

    const handleShowSelect = (show: Show) => {
        setSelectedShow(show)
        setSelectedTime(format(new Date(show.startTime), "hh:mm a"))
    }

    const filteredShows = selectedDate
        ? selectedLanguage === "All"
            ? Object.entries(getAvailableShows(selectedDate))
            : [[selectedLanguage, getAvailableShows(selectedDate)[selectedLanguage] || []]]
        : []

    const handleSeatSelect = (seats: string[]) => {
        setSelectedSeats(seats)
    }





    return (
        <div className="mt-8">
            <Accordion
                type="single"
                collapsible
                value={activeAccordion}
                onValueChange={setActiveAccordion}
                className="space-y-4 transition-all duration-300 ease-in-out"
            >
                <AccordionItem value="step-1" className="bg-glass backdrop-blur-md border-gray-700 rounded-lg">
                    <AccordionTrigger className="px-6 text-white hover:no-underline">
                        <div className="flex items-center gap-2">
                            <span className="bg-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                            <span className="text-sm sm:text-base">Select Date, Language & Time Slots</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 transition-all duration-300 ease-in-out">
                        <div className="space-y-6 min-h-[400px]">
                            {/* Date Selection */}
                            <div>
                                <h3 className="text-gray-300 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <Calendar className="w-4 h-4" /> Select Date
                                    {selectedDate && (
                                        <span className="text-primary-foreground text-xs">({format(selectedDate, "MMM dd, EEE")})</span>
                                    )}
                                </h3>
                                <div className="flex gap-3 overflow-x-auto p-2">
                                    {dates.map((date) => (
                                        <Button
                                            key={date.toISOString()}
                                            className={`flex-col h-[80px] w-[70px] py-2 px-3 sm:px-4 transition-all duration-200 ease-in-out ${selectedDate?.toDateString() === date.toDateString()
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                : "bg-gray-700 hover:bg-gray-600"
                                                } text-sm sm:text-base relative`}
                                            aria-selected={selectedDate?.toDateString() === date.toDateString()}
                                            onClick={() => handleDateSelect(date)}
                                        >
                                            <span className="text-xs text-gray-300">{format(date, "MMM")}</span>
                                            <span className="text-xl font-bold">{format(date, "dd")}</span>
                                            <span className="text-xs">{format(date, "EEE")}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Language Selection */}
                            <div>
                                <h3 className="text-gray-300 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <Globe className="w-4 h-4" /> Select Language
                                    {selectedLanguage && <span className="text-primary-foreground text-xs">({selectedLanguage})</span>}
                                </h3>
                                <div className="flex gap-3">
                                    {["All", ...Array.from(new Set(Object.keys(getAvailableShows(selectedDate || new Date()))))].map(
                                        (lang) => (
                                            <Button
                                                key={lang}
                                                className={`transition-all duration-200 ease-in-out ${selectedLanguage === lang
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                    : "bg-gray-700 hover:bg-gray-600"
                                                    } text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2`}
                                                aria-selected={selectedLanguage === lang}
                                                onClick={() => setSelectedLanguage(lang)}
                                            >
                                                {lang}
                                            </Button>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div>
                                <h3 className="text-gray-300 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <Clock className="w-4 h-4" /> Available Shows
                                    {selectedTime && <span className="text-primary-foreground text-xs">({selectedTime})</span>}
                                </h3>
                                {selectedDate ? (
                                    filteredShows.map(([language, shows]) => (
                                        <div key={language.toString()} className="mb-4">
                                            <h4 className="text-gray-400 mb-2 text-sm">{String(language)}</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                                {Array.isArray(shows) &&
                                                    shows.map((show) => {
                                                        const showTime = new Date(show.startTime)
                                                        const time = format(showTime, "hh:mm a")
                                                        const isPastShow = isPast(showTime)
                                                        return (
                                                            <Button
                                                                key={show.id}
                                                                className={`transition-all duration-200 ease-in-out ${selectedShow?.id === show.id
                                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                                    : isPastShow
                                                                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                                                        : "bg-gray-700 hover:bg-gray-600"
                                                                    } text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2`}
                                                                aria-selected={selectedShow?.id === show.id}
                                                                onClick={() => !isPastShow && handleShowSelect(show)}
                                                                disabled={isPastShow}
                                                            >
                                                                <span>{time}</span>
                                                            </Button>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-400 text-sm">Please select a date to see available shows.</div>
                                )}
                                {selectedDate && filteredShows.length === 0 && (
                                    <div className="text-gray-400 text-sm">No shows available for this date and language.</div>
                                )}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem
                    value="step-2"
                    className="bg-glass backdrop-blur-md border-gray-700 rounded-lg transition-all duration-300 ease-in-out"
                >
                    <AccordionTrigger className="px-6 text-white hover:no-underline" disabled={!canSelectSeats}>
                        <div className="flex items-center gap-2">
                            <span
                                className={`rounded-full w-6 h-6 flex items-center justify-center text-sm ${canSelectSeats ? "bg-indigo-600" : "bg-gray-600"}`}
                            >
                                2
                            </span>
                            {/* @ts-ignore */}
                            <span>Pick Seats {selectedShow && `| ${selectedShow?.screen.name}`}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 transition-all duration-300 ease-in-out">
                        {canSelectSeats ? (
                            <div className="space-y-4">
                                <SeatSelector
                                    // @ts-ignore
                                    screenName={selectedShow?.screen.name || ""}
                                    movieName={movie.title}
                                    language={selectedShow?.language || ""}
                                    // @ts-ignore
                                    seats={selectedShow?.screen.seats || []}
                                    onSeatSelect={handleSeatSelect}
                                />
                                <Button
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    disabled={selectedSeats.length === 0}
                                >
                                    Proceed to Payment
                                </Button>
                            </div>
                        ) : (
                            <div className="h-[300px] sm:h-[400px] flex items-center justify-center text-gray-400 text-sm sm:text-base">
                                Please select a date and time to enable seat selection
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Accordian;

