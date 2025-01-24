import React, { forwardRef, useImperativeHandle } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { emailSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Spinner from "@/components/spinner/Spinner"


interface EmailFormProps {
    onSubmit: (data: z.infer<typeof emailSchema>) => void
    isPending?: boolean
    userEmail?: string | null
}

const EmailForm = forwardRef(({ onSubmit, isPending, userEmail }: EmailFormProps, ref) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: userEmail || "",
        },
    })

    useImperativeHandle(ref, () => ({
        setError,
    }))

    const handleFormSubmit = (data: z.infer<typeof emailSchema>) => {
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="space-y-2">
                {userEmail ? (
                    <p className="text-gray-300 mb-4 text-center tracking-wide leading-[27px]">We'll send an OTP to your email: {userEmail}</p>
                ) : (
                    <>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            className="bg-[#222222] border-gray-700 text-gray-100 focus:ring-yellowShade focus:border-yellowShade"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </>
                )}
            </div>
            <Button
                className="w-full bg-yellowShade hover:bg-yellowShadeHover text-black font-medium tracking-wide transition-colors duration-200"
                type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                        <Spinner />
                        Sending OTP...
                    </span>
                ) : (
                    "Send OTP"
                )}
            </Button>
        </form>
    )
})

EmailForm.displayName = "EmailForm"

export default EmailForm;

