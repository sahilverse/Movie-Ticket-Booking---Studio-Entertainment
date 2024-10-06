import React from 'react'

import { googleLogin } from '@/actions/login';
import { FaGoogle } from "react-icons/fa";


const GoogleBtn = ({ styles, disabled }: { styles: Record<string, string>, disabled?: boolean }) => {
    return (
        <form action={googleLogin}>

            <button type='submit' className={`${styles.btn} ${styles.google_btn}`} disabled={disabled}>

                <span><FaGoogle /></span>
                <span>Sign in with Google</span>


            </button>

        </form>
    )
}

export default GoogleBtn;
