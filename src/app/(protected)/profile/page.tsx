import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import avatarPlaceholder from "@/assets/Profile/placeholder.jpg"
import Image from "next/image"
import { currentUser } from "@/lib/auth"
import PersonalDetails from "@/components/client/profile/PersonalDetails"
import { User } from "@prisma/client"
import Security from "@/components/client/profile/Security"

export default async function Profile() {
    const user: User = await currentUser();

    return (
        <main className=" text-white main_container mt-14 mb-7">
            <div className="max-w-4xl mx-auto space-y-8 ">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-4">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32">
                        <Image src={avatarPlaceholder} alt="Profile picture" priority />
                    </Avatar>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold text-white tracking-wider">{user?.name}</h1>
                        <p className="text-gray-400 tracking-wide">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <Tabs defaultValue="personal" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2 bg-[#222222]">
                        <TabsTrigger value="personal" className="data-[state=active]:bg-[#efae26] text-white">
                            Personal Information
                        </TabsTrigger>
                        <TabsTrigger value="security" className="data-[state=active]:bg-[#efae26] text-white">
                            Security
                        </TabsTrigger>
                    </TabsList>
                    {/* Personal Details */}
                    <PersonalDetails user={user} />

                    {/* Security */}
                    <Security user={user} />

                </Tabs>


            </div>
        </main>
    )
}