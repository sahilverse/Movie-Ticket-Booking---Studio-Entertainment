import React, { forwardRef, useImperativeHandle } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { otpSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/components/spinner/Spinner'



interface OtpFormProps {
    onSubmit: (data: z.infer<typeof otpSchema>) => void
    isPending?: boolean
}

const OtpForm = forwardRef(({ onSubmit, isPending }: OtpFormProps, ref) => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: ''
        }
    });


    useImperativeHandle(ref, () => ({
        setError
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-gray-300">OTP</Label>
                <Input
                    id="otp"
                    type="text"
                    placeholder="Enter the OTP"
                    className="bg-[#222222] border-gray-700 text-gray-100 focus:ring-[#F5B041] focus:border-[#F5B041]"
                    {...register('otp')}
                />

                {errors.otp && (
                    <p className="text-red-500 text-sm">{errors.otp.message}</p>
                )}
            </div>
            <Button
                className="w-full bg-[#efae26] hover:bg-[#efaf26d8]] text-black font-medium tracking-wide transition-colors duration-200"
                type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <span className='flex gap-2'>
                        <Spinner /> Verifying OTP...
                    </span>
                ) : ('Verify OTP')}

            </Button>
        </form>
    )
});

OtpForm.displayName = 'OtpForm';

export default OtpForm;


