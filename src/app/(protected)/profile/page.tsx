import React from 'react'


import { auth } from "@/auth"

const ProfilePage = async () => {
    const session = await auth();
    return (
        <div className='main_container'>
            <h1>Profile</h1>
            <p>{JSON.stringify(session)}</p>
        </div>
    )
}

export default ProfilePage;