"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface SessionExpiredDialogProps {
    isOpen: boolean
    onClose: () => void
}

export function SessionExpiredDialog({ isOpen, onClose }: SessionExpiredDialogProps) {
    const router = useRouter()

    const handleBackToHome = () => {

        router.push("/")
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl">Session Expired</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Your booking session has expired due to inactivity. Please return to the home page to start a new booking.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleBackToHome} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold">
                        Back to Home
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

