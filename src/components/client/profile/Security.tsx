"use client";

import React, { useState, useTransition } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import { passwordSchema } from '@/lib/zod';
import { updatePassword } from '@/actions/userDetails';
import { User } from '@prisma/client';


export const Security = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
        const loadingToastId = toast.loading("Updating Password...");
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
            } finally {
                toast.dismiss(loadingToastId);
            }

        });
    }

    return (
        <TabsContent value="security">
            <Card className="bg-[#222222] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">Change Password</CardTitle>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Input type="hidden" value={user.id} {...register("userID")} />
                            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                className="bg-[#333333] border-gray-700 text-white"
                                autoComplete="current-password"
                                {...register("currentPassword")}

                            />
                            {errors.currentPassword && <p className="text-red-500 text-xs">{errors.currentPassword.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-white">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                className="bg-[#333333] border-gray-700 text-white"
                                autoComplete="new-password"
                                {...register("newPassword")}
                            />
                            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                className="bg-[#333333] border-gray-700 text-white"
                                autoComplete="new-password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button className="w-full bg-[#efae26] hover:bg-[#efae26]/90 text-white" disabled={isPending}>
                            {isPending ? "Updating Password..." : "Update Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default Security;
