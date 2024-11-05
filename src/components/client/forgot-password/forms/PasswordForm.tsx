import React, { forwardRef, useImperativeHandle } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { resetPasswordSchema } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from '@/components/spinner/Spinner'

interface PasswordFormProps {
    onSubmit: (data: z.infer<typeof resetPasswordSchema>) => void
    isPending?: boolean
}

const PasswordForm = forwardRef(({ onSubmit, isPending }: PasswordFormProps, ref) => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    });
    const [showPassword, setShowPassword] = React.useState({
        new: false,
        confirm: false
    });


    const togglePasswordVisibility = (field: 'new' | 'confirm') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    };

    useImperativeHandle(ref, () => ({
        setError
    }));
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-300">New Password</Label>
                <div className='relative'>

                    <Input
                        id="newPasswordd"
                        type={showPassword.new ? "text" : "password"}
                        placeholder="Enter your new password"
                        required
                        className="bg-[#222222] border-gray-700 text-gray-100 focus:ring-[#F5B041] focus:border-[#F5B041]"
                        {...register('newPassword')}
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400"
                        onClick={() => togglePasswordVisibility('new')}
                    >
                        {showPassword.new ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                    </Button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</Label>
                <div className="relative">

                    <Input
                        id="confirmPassword"
                        type={showPassword.confirm ? "text" : "password"}
                        placeholder="Re-enter your new password"
                        required
                        className="bg-[#222222] border-gray-700 text-gray-100 focus:ring-[#F5B041] focus:border-[#F5B041]"
                        {...register('confirmPassword')}
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 "
                        onClick={() => togglePasswordVisibility('confirm')}
                    >
                        {showPassword.confirm ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                    </Button>


                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>
            <Button
                className="w-full bg-[#efae26] hover:bg-[#efaf26d8] text-black font-medium tracking-wide transition-colors duration-200"
                type="submit"
                disabled={isPending}
            >
                {isPending ? (
                    <span className='flex gap-2'>
                        <Spinner /> Resetting Password...
                    </span>
                ) : ('Reset Password')}

            </Button>
        </form>
    )
});

PasswordForm.displayName = 'PasswordForm';

export default PasswordForm;