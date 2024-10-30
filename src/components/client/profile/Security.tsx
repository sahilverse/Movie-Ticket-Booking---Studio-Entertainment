import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const Security = () => {
    return (
        <TabsContent value="security">
            <Card className="bg-[#222222] border-gray-800">
                <CardHeader>
                    <CardTitle className="text-white">Change Password</CardTitle>
                </CardHeader>
                <CardContent >
                    <form action="" className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                className="bg-[#333333] border-gray-700 text-white"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-white">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                className="bg-[#333333] border-gray-700 text-white"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                className="bg-[#333333] border-gray-700 text-white"
                                autoComplete="new-password"
                            />
                        </div>
                        <Button className="w-full bg-[#efae26] hover:bg-[#efae26]/90 text-white">
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

export default Security;
