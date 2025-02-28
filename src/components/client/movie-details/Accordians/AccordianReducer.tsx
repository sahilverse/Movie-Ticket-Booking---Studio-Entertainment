import { Show } from "@prisma/client"
import { format } from "date-fns"



export type BookingState = {
    selectedDate: Date | null
    selectedLanguage: string
    selectedTime: string
    activeAccordion: string
    selectedShow: Show | null
    selectedSeats: string[]
    selectedScreen: string
    isSummaryOpen: boolean
}

export type BookingAction =
    | { type: "SELECT_DATE"; payload: Date }
    | { type: "SELECT_LANGUAGE"; payload: string }
    | { type: "SELECT_SHOW"; payload: Show }
    | { type: "SELECT_SEATS"; payload: string[] }
    | { type: "SET_ACCORDION"; payload: string }
    | { type: "TOGGLE_SUMMARY"; payload: boolean }
    | { type: "RESET_SELECTIONS" }
    | { type: "INITIALIZE_FROM_URL"; payload: Show }
    | { type: "RESET_SEATS" }



export const initialState: BookingState = {
    selectedDate: null,
    selectedLanguage: "All",
    selectedTime: "",
    activeAccordion: "step-1",
    selectedShow: null,
    selectedSeats: [],
    selectedScreen: "",
    isSummaryOpen: false,
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
    switch (action.type) {
        case "SELECT_DATE":
            return {
                ...state,
                selectedDate: action.payload,
                selectedTime: "",
                selectedShow: null,
                selectedLanguage: "All",
                selectedScreen: "",
                selectedSeats: [],
            }
        case "SELECT_LANGUAGE":
            return {
                ...state,
                selectedLanguage: action.payload,
                selectedTime: "",
                selectedScreen: "",
                selectedShow: null,
                selectedSeats: [],
            }
        case "SELECT_SHOW":
            return {
                ...state,
                selectedShow: action.payload,
                selectedTime: format(new Date(action.payload.startTime), "hh:mm a"),
                // @ts-ignore
                selectedScreen: action.payload.screen?.name || "",
                selectedSeats: [],
            }
        case "SELECT_SEATS":
            return {
                ...state,
                selectedSeats: action.payload,
            }
        case "SET_ACCORDION":
            return {
                ...state,
                activeAccordion: action.payload,
            }
        case "TOGGLE_SUMMARY":
            return {
                ...state,
                isSummaryOpen: action.payload,
            }
        case "RESET_SELECTIONS":
            return initialState
        case "RESET_SEATS":
            return {
                ...state,
                selectedSeats: [],
            }
        case "INITIALIZE_FROM_URL":
            const date = new Date(action.payload.startTime)
            return {
                ...state,
                selectedDate: date,
                selectedTime: format(date, "hh:mm a"),
                selectedShow: action.payload,
                // @ts-ignore
                selectedScreen: action.payload.screen?.name || "",
                selectedLanguage: action.payload.language,
            }
        default:
            return state
    }
}
