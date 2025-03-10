"use client"

import { useReducer, useEffect, useTransition, useMemo, useCallback, useState } from "react"
import { format, isSameDay, isPast, set } from "date-fns"
import { Calendar, Clock, Globe } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { Show } from "@prisma/client"
import type { MovieWithShowsAndSeats, ShowWithSeats } from "@/types/types"
import SeatSelector from "./SeatSelector"
import { SeatSummaryDialog } from "@/components/popups/seat-summary/SeatSummary"
import { createBooking } from "@/actions/bookSeat"
import { useSearchParams } from "next/navigation"
import { bookingReducer, initialState } from "./AccordianReducer"
import { useRouter } from "next/navigation"
import { ErrorDialog } from "./ErrorDialog"


interface AccordionProps {
    movie: MovieWithShowsAndSeats
}


const BookingAccordion = ({ movie }: AccordionProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition();
    const [openDialog, setOpenDialog] = useState(false)

    const [state, dispatch] = useReducer(bookingReducer, initialState)
    const {
        selectedDate,
        selectedLanguage,
        selectedTime,
        activeAccordion,
        selectedShow,
        selectedSeats,
        selectedScreen,
        isSummaryOpen,
    } = state

    const today = new Date()
    const dates = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        return date
    })

    // Effect to handle accordion state changes
    useEffect(() => {
        if (selectedDate && selectedTime && selectedScreen && selectedLanguage) {
            const timeoutId = setTimeout(() => {
                dispatch({ type: "SET_ACCORDION", payload: "step-2" })
            }, 1)
            return () => clearTimeout(timeoutId)
        } else {
            dispatch({ type: "SET_ACCORDION", payload: "step-1" })
        }
    }, [selectedDate, selectedTime, selectedScreen, selectedLanguage])

    // Effect to handle URL parameters
    useEffect(() => {
        const showIdParam = searchParams.get("showId")
        if (showIdParam) {
            const show = movie.shows.find((s) => s.id === showIdParam)
            if (show) {
                dispatch({ type: "INITIALIZE_FROM_URL", payload: show as Show })
            }
        }
    }, [searchParams, movie.shows])

    const getAvailableShows = useCallback(
        (date: Date) => {
            if (!date) return {}

            const filteredShows = movie.shows.filter((show) => isSameDay(new Date(show.startTime), date))
            return filteredShows.reduce(
                (acc, show) => {
                    const timeKey = format(new Date(show.startTime), "hh:mm a")
                    if (!acc[show.language]) {
                        acc[show.language] = {}
                    }
                    if (!acc[show.language][timeKey]) {
                        acc[show.language][timeKey] = []
                    }
                    acc[show.language][timeKey].push(show)
                    return acc
                },
                {} as Record<string, Record<string, Show[]>>,
            )
        },
        [movie.shows],
    )

    const filteredShows = useMemo(() => {
        if (!selectedDate) return []

        const availableShows = getAvailableShows(selectedDate)
        return selectedLanguage === "All"
            ? Object.entries(availableShows)
            : [[selectedLanguage, availableShows[selectedLanguage] || {}]]
    }, [selectedDate, selectedLanguage, getAvailableShows])

    const availableLanguages = useMemo(() => {
        if (!selectedDate) return ["All"]
        const shows = getAvailableShows(selectedDate)
        return ["All", ...Object.keys(shows)]
    }, [selectedDate, getAvailableShows])

    const canSelectSeats = Boolean(selectedDate && selectedTime && selectedShow)

    const handleDateSelect = (date: Date) => {
        dispatch({ type: "SELECT_DATE", payload: date })
    }

    const handleLanguageSelect = (language: string) => {
        dispatch({ type: "SELECT_LANGUAGE", payload: language })
    }

    const handleShowSelect = (show: Show) => {
        dispatch({ type: "SELECT_SHOW", payload: show })
    }

    const handleSeatSelect = (seats: string[]) => {
        dispatch({ type: "SELECT_SEATS", payload: seats })
    }

    const handleSummary = () => {
        dispatch({ type: "TOGGLE_SUMMARY", payload: true })
    }

    const handleErrorDialogClose = () => {
        setOpenDialog(false);
        window.location.reload();
    }
    const handleBooking = () => {
        startTransition(async () => {
            if (!selectedShow) return

            const { success, bookingId, error } = await createBooking(selectedShow.id, selectedSeats, movie.slug)
            if (success) {

                // Redirect to checkout
                router.push(`/checkout/${movie.slug}/${bookingId}`)


            } else {
                if (error === "Already Booked") {
                    setOpenDialog(true);
                }
            }
        })
    }

    return (
        <div className="mt-8">
            <Accordion
                type="single"
                collapsible
                value={activeAccordion}
                onValueChange={(value) => dispatch({ type: "SET_ACCORDION", payload: value })}
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
                                            className={`flex-col h-[85px] w-[70px] py-2 px-3 sm:px-4 transition-all duration-200 ease-in-out ${selectedDate?.toDateString() === date.toDateString()
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
                                    {availableLanguages.map((lang) => (
                                        <Button
                                            key={lang}
                                            className={`transition-all duration-200 ease-in-out ${selectedLanguage === lang
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                : "bg-gray-700 hover:bg-gray-600"
                                                } text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2`}
                                            aria-selected={selectedLanguage === lang}
                                            onClick={() => handleLanguageSelect(lang)}
                                        >
                                            {lang}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            <div>
                                <h3 className="text-gray-300 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <Clock className="w-4 h-4" /> Available Shows
                                    {selectedTime && <span className="text-primary-foreground text-xs">({selectedTime})</span>}
                                </h3>
                                {selectedDate ? (
                                    filteredShows.length > 0 ? (
                                        filteredShows.map(([language, showsByTime]) => (
                                            <div key={language.toString()} className="mb-4">
                                                <h4 className="text-gray-400 mb-2 text-sm">{String(language)}</h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                                    {Object.entries(showsByTime).map(([time, shows]) => {
                                                        const isPastShow = isPast(new Date(shows[0].startTime))
                                                        return (
                                                            <Button
                                                                key={time}
                                                                className={`transition-all duration-200 ease-in-out ${selectedTime === time && selectedShow?.id === shows[0].id
                                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                                    : isPastShow
                                                                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                                                        : "bg-gray-700 hover:bg-gray-600"
                                                                    } text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2`}
                                                                onClick={() => handleShowSelect(shows[0])}
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
                                        <div className="text-gray-400 text-sm">No shows available for this date and language.</div>
                                    )
                                ) : (
                                    <div className="text-gray-400 text-sm">Please select a date to see available shows.</div>
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
                                className={`rounded-full w-6 h-6 flex items-center justify-center text-sm ${canSelectSeats ? "bg-indigo-600" : "bg-gray-600"
                                    }`}
                            >
                                2
                            </span>
                            {/* @ts-ignore */}
                            <span>Pick Seats {selectedShow && selectedShow.screen?.name ? `| ${selectedShow.screen.name}` : ""}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 transition-all duration-300 ease-in-out">
                        {canSelectSeats ? (
                            <div className="space-y-4 flex flex-col items-center">
                                <SeatSelector
                                    // @ts-ignore
                                    seats={selectedShow?.screen?.seats || []}
                                    // @ts-ignore
                                    showSeats={selectedShow?.ShowSeat || []}
                                    onSeatSelect={handleSeatSelect}
                                    selectedSeats={selectedSeats}
                                />
                                <Button
                                    className="bg-yellow-400 cursor-pointer hover:bg-yellowShadeHover text-black tracking-wide font-roboto font-bold text-md disabled:bg-gray-500 disabled:text-gray-300"
                                    disabled={selectedSeats.length === 0}
                                    onClick={handleSummary}
                                >
                                    Book Now
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

            <SeatSummaryDialog
                open={isSummaryOpen}
                onOpenChange={(open) => dispatch({ type: "TOGGLE_SUMMARY", payload: open })}
                selectedSeats={selectedSeats}
                show={selectedShow as ShowWithSeats}
                handleConfirm={handleBooking}
                isPending={isPending}
            />

            <ErrorDialog
                isOpen={openDialog}
                onClose={handleErrorDialogClose}
                message="Sorry, one of the seats you selected has already been booked."
            />
        </div>
    )
}

export default BookingAccordion;

