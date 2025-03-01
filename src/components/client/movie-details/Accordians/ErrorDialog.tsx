"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,

} from "@/components/ui/dialog"


interface ErrorDialogProps {
    isOpen: boolean
    onClose: () => void
    message: string
}

export function ErrorDialog({ isOpen, onClose, message }: ErrorDialogProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                <DialogHeader>
                    <DialogDescription className="text-xl text-zinc-300 leading-[30px]">
                        {message}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

