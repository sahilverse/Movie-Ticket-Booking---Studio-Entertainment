"use client";
import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { TabsContent } from '@radix-ui/react-tabs';
import { Save, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { User, Gender } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateUserDetails } from '@/actions/userDetails';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDetailsSchema } from '@/lib/zod';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/spinner/Spinner';

const PersonalDetails = ({ user }: { user: User }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { data: session, update } = useSession();
    const router = useRouter();


    // Define initial values
    const initialValues = {
        userID: user?.id,
        username: user?.name,
        phone: user?.phone ?? "Not Provided",
        date_of_birth: user?.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : "",
        gender: user.gender ?? null
    };

    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm<z.infer<typeof userDetailsSchema>>({
        resolver: zodResolver(userDetailsSchema),
        defaultValues: initialValues
    });

    const onSubmit = async (data: z.infer<typeof userDetailsSchema>) => {
        // Check if there are any changes by comparing current and initial values
        const hasChanges = Object.keys(initialValues).some((key) => initialValues[key as keyof typeof initialValues] !== data[key as keyof typeof data]);
        if (!hasChanges) {
            return
        }
        startTransition(async () => {
            try {
                const response = await updateUserDetails(data);
                if (response?.error) {
                    if (typeof response.error === 'object' && 'phone' in response.error) {
                        setError("phone", { message: response.error.phone });
                    }
                    toast.error("An error occurred! Please try again");
                    return;
                } else {

                    if (response?.user && session?.user) {
                        const updatedUser = response.user;
                        await update({
                            user: {
                                ...session?.user,
                                name: updatedUser.name,
                                phone: updatedUser.phone,
                                birthDate: updatedUser.birthDate,
                                gender: updatedUser.gender
                            }
                        });


                        toast.success("Details Updated Successfully");
                        setIsEditing(!isEditing);
                        router.refresh();

                    }
                }
            } catch (error) {
                toast.error("An error occurred! Please try again");
            }
        });
    }

    return (
        <TabsContent value="personal">
            <Card className="bg-[#222222] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-yellowShade"
                    >
                        {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        id="personalDetailsForm"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input type="hidden" value={user.id} {...register("userID")} />

                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-white">Full Name</Label>
                            <Input
                                id="username"
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                                {...register("username")}
                            />
                            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user?.email ?? ""}
                                disabled
                                className="bg-[#333333] border-gray-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                                {...register("phone")}
                            />
                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date_of_birth" className="text-white">Date of Birth</Label>
                            <Input
                                id="date_of_birth"
                                type="date"
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                                {...register("date_of_birth")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-white">Gender</Label>
                            <Select
                                disabled={!isEditing}
                                onValueChange={(value) => setValue("gender", value as Gender)}
                            >
                                <SelectTrigger className="bg-[#333333] border-gray-700 text-white">
                                    <SelectValue placeholder={user.gender ?? "Select your gender"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={Gender.Male}>Male</SelectItem>
                                    <SelectItem value={Gender.Female}>Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                    {isEditing && (
                        <Button className="w-full bg-yellowShade hover:bg-yellowShadeHover text-white " type="submit"
                            form='personalDetailsForm'
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Spinner />
                                    Updating Details...
                                </>
                            ) : (
                                <>

                                    Save Changes
                                </>
                            )}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default PersonalDetails;
