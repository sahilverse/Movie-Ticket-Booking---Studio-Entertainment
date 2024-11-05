import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { emailSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/components/spinner/Spinner';

interface EmailFormProps {
    onSubmit: (data: z.infer<typeof emailSchema>) => void;
    isPending?: boolean;
}


const EmailForm = forwardRef(({ onSubmit, isPending }: EmailFormProps, ref) => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: ''
        }
    });


    useImperativeHandle(ref, () => ({
        setError
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                <Input
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    className="bg-[#222222] border-gray-700 text-gray-100 focus:ring-[#F5B041] focus:border-[#F5B041]"
                    {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <Button
                className="w-full bg-[#efae26] hover:bg-[#efaf26d8] text-black font-medium tracking-wide transition-colors duration-200"
                type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <span className='flex gap-2'>
                        <Spinner /> Sending OTP...
                    </span>
                ) : ('Send OTP')}
            </Button>
        </form>
    );
});

EmailForm.displayName = 'EmailForm'; // To avoid issues with component naming

export default EmailForm;
