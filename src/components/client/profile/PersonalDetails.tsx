"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { TabsContent } from '@radix-ui/react-tabs';
import { Save, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { User } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const PersonalDetails = ({ user }: { user: User }) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <TabsContent value="personal">
            <Card className="bg-[#222222] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-[#efae26]"
                    >
                        {isEditing ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white">Full Name</Label>
                            <Input
                                id="firstName"
                                defaultValue={user?.name ?? ""}
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user?.email ?? ""}
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-white">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                defaultValue={user?.phone ?? "Not provided"}
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob" className="text-white">Date of Birth</Label>
                            <Input
                                id="dob"
                                type="date"
                                defaultValue={user?.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : ""}
                                disabled={!isEditing}
                                className="bg-[#333333] border-gray-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-white">Gender</Label>
                            <Select disabled={!isEditing}>
                                <SelectTrigger className="bg-[#333333] border-gray-700 text-white">
                                    <SelectValue placeholder={user?.gender ?? "Select gender"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>

                    {isEditing && (
                        <Button className="w-full bg-[#efae26] hover:bg-[#efae26]/90 text-white">
                            Save Changes
                        </Button>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default PersonalDetails;