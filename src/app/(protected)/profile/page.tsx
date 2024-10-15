import { currentUser } from '@/lib/auth';
import React from 'react'




const ProfilePage = async () => {
    const user = await currentUser();
    return (
        <div className='main_container'>
            <div className='container'>
                <h1>Profile</h1>
                <div className='card'>
                    <div className='card-body'>
                        <h2>Name: {user?.name}</h2>
                        <p>Email: {user?.email}</p>
                        <p>Phone: {user?.phone}</p>
                        <p>City: {user?.city}</p>
                        <p>Birth Date: {user?.birthDate}</p>
                        <p>Phone Number: {user?.phone ?? "Not Specified"}</p>
                        <p>Gender: {user?.gender ?? "Not Specified"}</p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage;