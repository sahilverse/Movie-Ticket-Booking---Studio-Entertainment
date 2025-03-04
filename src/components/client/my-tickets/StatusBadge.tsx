import { CheckCircle, XCircle, Clock4 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { BookingStatus } from "@prisma/client"

interface StatusBadgeProps {
    status: BookingStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
    switch (status) {
        case "CONFIRMED":
            return (
                <Badge className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
                </Badge>
            )
        case "CANCELLED":
            return (
                <Badge className="bg-red-600 hover:bg-red-700">
                    <XCircle className="h-3 w-3 mr-1" /> Cancelled
                </Badge>
            )
        case "PENDING":
            return (
                <Badge className="bg-amber-500 hover:bg-amber-600">
                    <Clock4 className="h-3 w-3 mr-1" /> Pending
                </Badge>
            )
        default:
            return null;
    }
}

