import React from 'react'


import { FaGoogle } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';


const GoogleBtn = ({ styles, disabled }: { styles: Record<string, string>, disabled?: boolean }) => {
    const googleLogin = async () => {
        await signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT, redirect: false });
    }

    return (


        <button type='button' className={`${styles.btn} ${styles.google_btn}`} disabled={disabled} onClick={googleLogin}>

            <span><FaGoogle /></span>
            <span>Sign in with Google</span>


        </button>


    )
}

export default GoogleBtn;
