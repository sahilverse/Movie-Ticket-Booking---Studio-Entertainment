"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useRef, useState, useTransition } from "react"
import PasswordForm from "./forms/PasswordForm"
import OtpForm from "./forms/OtpForm"
import EmailForm from "./forms/EmailForm"
import type * as z from "zod"
import type { emailSchema, otpSchema, resetPasswordSchema } from "@/lib/zod"
import { resetPassword, sendPasswordResetVerificationCode, verifyPasswordResetCode } from "@/actions/userDetails"
import SuccessMessage from "./SuccessMessage"
import { useCurrentUser } from "@/hooks/useCurrentUser"

const ForgotPassword = () => {
    const { user } = useCurrentUser()

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState(user?.email || "")
    const [isPending, startTransition] = useTransition()
    const [feedback, setFeedback] = useState("")
    const emailRef = useRef<{ setError: (field: string, error: { type: string; message: string }) => void } | null>(null)
    const otpRef = useRef<{ setError: (field: string, error: { type: string; message: string }) => void } | null>(null)
    const passwordRef = useRef<{ setError: (field: string, error: { type: string; message: string }) => void } | null>(
        null,
    )

    const handleSendOTP = (data: z.infer<typeof emailSchema>) => {
        setEmail(data.email)
        startTransition(async () => {
            setFeedback("Sending OTP...")
            try {
                const res = await sendPasswordResetVerificationCode(data)

                if (res?.error && emailRef.current) {
                    emailRef.current.setError("email", {
                        type: "server",
                        message: res.error,
                    })
                    setFeedback("")
                    return
                }

                setStep(2)
                setFeedback("OTP sent successfully. Please check your email.")
            } catch (err) {
                if (emailRef.current) {
                    emailRef.current.setError("email", {
                        type: "manual",
                        message: "An error occurred. Please try again.",
                    })
                    setFeedback("")
                    return
                }
            }
        })
    }

    const handleVerifyOTP = async (data: z.infer<typeof otpSchema>) => {
        startTransition(async () => {
            setFeedback("Verifying OTP...")
            try {
                const res = await verifyPasswordResetCode(data, email)

                if (res?.error && otpRef.current) {
                    otpRef.current.setError("otp", {
                        type: "server",
                        message: res.error,
                    })
                    setFeedback("")
                    return
                }

                setStep(3)
                setFeedback("OTP verified successfully.")
            } catch (error) {
                if (otpRef.current) {
                    otpRef.current.setError("otp", {
                        type: "manual",
                        message: "An error occurred. Please try again.",
                    })
                    setFeedback("")
                    return
                }
            }
        })
    }

    const handleResetPassword = (data: z.infer<typeof resetPasswordSchema>) => {
        startTransition(async () => {
            setFeedback("Resetting password...")
            try {
                const res = await resetPassword(data, email)

                if (res?.error && passwordRef.current) {
                    passwordRef.current.setError("confirmPassword", {
                        type: "server",
                        message: res.error,
                    })
                    setFeedback("")
                    return
                }

                setStep(4)
                setFeedback("Password reset successfully.")
            } catch (error) {
                if (passwordRef.current) {
                    passwordRef.current.setError("confirmPassword", {
                        type: "manual",
                        message: "An error occurred. Please try again.",
                    })
                    setFeedback("")
                    return
                }
            }
        })
    }

    return (
        <div className="flex items-center justify-center px-4 py-12 bg-[#111111] ">
            <Card className="w-full max-w-md bg-[#222222] border-gray-800 text-gray-100">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                    <CardDescription className="text-gray-400 text-center">
                        {step === 1 && !user && "Enter your email to receive a one-time password."}
                        {step === 2 && "Enter the OTP sent to your email."}
                        {step === 3 && "Enter your new password."}
                        {step === 4 && "Password reset successfully."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {feedback && <div className="mb-4 p-2 bg-[#333333] text-gray-100 rounded text-center">{feedback}</div>}
                    {step === 1 && (
                        <EmailForm onSubmit={handleSendOTP} isPending={isPending} ref={emailRef} userEmail={user?.email} />
                    )}

                    {step === 2 && <OtpForm onSubmit={handleVerifyOTP} isPending={isPending} ref={otpRef} />}

                    {step === 3 && <PasswordForm onSubmit={handleResetPassword} isPending={isPending} ref={passwordRef} />}

                    {step === 4 && <SuccessMessage />}
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword;

