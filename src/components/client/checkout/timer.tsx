"use client"

import { useEffect, useState } from "react"
import { Timer } from "lucide-react"
import { SessionExpiredDialog } from "./expiryDialog"


interface CountdownTimerProps {
    expiresAt: Date
    onExpire?: () => void
}

export function CountdownTimer({ expiresAt, onExpire }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{
        minutes: number
        seconds: number
    } | null>(null)
    const [showExpiredDialog, setShowExpiredDialog] = useState(false)

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const expiryTime = new Date(expiresAt).getTime()
            const difference = expiryTime - now

            if (difference <= 0) {
                setTimeLeft(null)
                setShowExpiredDialog(true)
                onExpire?.()
                return
            }

            const minutes = Math.floor((difference / 1000 / 60) % 60)
            const seconds = Math.floor((difference / 1000) % 60)

            setTimeLeft({ minutes, seconds })
        }

        // Calculate immediately
        calculateTimeLeft()

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [expiresAt, onExpire])

    const handleCloseDialog = () => {
        window.location.href = "/"
        setShowExpiredDialog(false)
    }

    return (
        <>
            {timeLeft && (
                <div
                    className={`flex items-center gap-2 font-mono text-lg ${timeLeft.minutes === 0 && timeLeft.seconds <= 60 ? "text-red-500" : "text-amber-500"
                        }`}
                >
                    <Timer className="h-5 w-5" />
                    <span>
                        {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                    </span>
                </div>
            )}
            <SessionExpiredDialog isOpen={showExpiredDialog} onClose={handleCloseDialog} />
        </>
    )
}

