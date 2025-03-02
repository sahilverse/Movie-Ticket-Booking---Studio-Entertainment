"use client"

import { useEffect, useRef } from "react"

export default function BookingStreamHandler() {
    const eventSourceRef = useRef<EventSource | null>(null)

    useEffect(() => {
        if (!eventSourceRef.current) {
            console.log("Initializing booking stream connection")
            const eventSource = new EventSource("/api/booking-stream")

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log("Received booking stream event:", data)
            }

            eventSource.onerror = (error) => {
                console.error("EventSource failed:", error)
                eventSource.close()
                eventSourceRef.current = null
            }

            eventSourceRef.current = eventSource
        }


        return () => {

            if (typeof window !== "undefined" && window.document.visibilityState === "hidden") {
                console.log("Closing booking stream connection")
                eventSourceRef.current?.close()
                eventSourceRef.current = null
            }
        }
    }, [])

    return null;
}

