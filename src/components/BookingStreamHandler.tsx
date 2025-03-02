"use client"

import { useEffect } from "react"

export default function BookingStreamHandler() {
    useEffect(() => {
        const eventSource = new EventSource("/api/booking-stream")

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("Received booking stream event:", data)
        }

        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return null;
}

