import React from 'react'


import { auth } from "@/auth"

const ProfilePage = async () => {
    const session = await auth();
    const user = session?.user;

    const birthDate = user?.birthDate ? new Date(user.birthDate) : null;
    const formattedBirthDate = birthDate
        ? `${birthDate.getDate()} ${birthDate.toLocaleString('default', { month: 'short' })} ${birthDate.getFullYear()}`
        : null;
    return (
        <div className='main_container'>
            <h1>Profile</h1>
            <p>{JSON.stringify(session)}</p>
            <p>date: {formattedBirthDate}</p>
            <p>phone: {JSON.stringify(session?.user.phone ?? "No Phone provided")}</p>
        </div>
    )
}

export default ProfilePage;