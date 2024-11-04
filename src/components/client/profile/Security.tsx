"use client";

import React, { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import { passwordSchema } from '@/lib/zod';
import { updatePassword } from '@/actions/userDetails';
import { User } from '@prisma/client';
import Link from 'next/link';
import { LockIcon, KeyIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Spinner from '@/components/spinner/Spinner';

export const Security = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = React.useState({
        current: false,
        new: false,
        confirm: false
    });

    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
        startTransition(async () => {
            try {
                const res = await updatePassword(data);
                if (res?.error) {
                    if (typeof res.error === 'object' && 'currentPassword' in res.error) {
                        setError("currentPassword", { message: res.error.currentPassword });
                    }
                    return;
                }
                reset();
                toast.success("Password updated successfully");
            } catch (error) {
                toast.error("An error occurred! Please try again");
            }
        });
    }

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
    }

    return (
        <TabsContent value="security" className="space-y-6">
            <Card className="bg-[#222222] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <LockIcon className="w-6 h-6 text-[#efae26]" />
                        Change Password
                    </CardTitle>
                    <CardDescription className="text-gray-400 ">
                        Update your password to keep your account secure.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input type="hidden" value={user.id} {...register("userID")} />
                        <div className='sr-only'>

                            <Input type="text" name="username" value={user.email} autoComplete='username' />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showPassword.current ? "text" : "password"}
                                    className="bg-[#333333] border-gray-700 text-white pr-10"
                                    autoComplete="current-password"
                                    {...register("currentPassword")}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-gray-400"
                                    onClick={() => togglePasswordVisibility('current')}
                                >
                                    {showPassword.current ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-white">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showPassword.new ? "text" : "password"}
                                    className="bg-[#333333] border-gray-700 text-white pr-10"
                                    autoComplete="new-password"
                                    {...register("newPassword")}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-gray-400 "
                                    onClick={() => togglePasswordVisibility('new')}
                                >
                                    {showPassword.new ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showPassword.confirm ? "text" : "password"}
                                    className="bg-[#333333] border-gray-700 text-white pr-10"
                                    autoComplete="new-password"
                                    {...register("confirmPassword")}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-gray-400 "
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {showPassword.confirm ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#efae26] hover:bg-[#efae26]/90 text-white font-semibold py-2 rounded-md transition duration-300 flex items-center justify-center gap-2"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Spinner />
                                    Updating Password...
                                </>
                            ) : (
                                <>
                                    <KeyIcon className="w-5 h-5" />
                                    Update Password
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/forgot-password" className="text-[#efae26] hover:underline text-sm">
                        Forgot your password?
                    </Link>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default Security;