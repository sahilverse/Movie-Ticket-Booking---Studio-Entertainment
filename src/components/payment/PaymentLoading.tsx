import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentLoading() {
    return (
        <div className=" text-white flex items-center justify-center p-4 h-[40rem]">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                    </div>
                    <CardTitle className="text-2xl">Processing</CardTitle>
                    <CardDescription className="text-zinc-400">Verifying payment status...</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-zinc-800 p-4 rounded-md space-y-2 animate-pulse">
                        <div className="h-4 bg-zinc-700 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-zinc-700 rounded w-1/2 mx-auto"></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

