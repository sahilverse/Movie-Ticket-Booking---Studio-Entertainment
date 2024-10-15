import React from 'react'


import { FaGoogle } from "react-icons/fa";
import { googleLogin } from "@/actions/login";
import { TStyle } from '@/types/types';



const GoogleBtn = ({ styles, disabled }: { styles: TStyle, disabled?: boolean }) => {


    return (


        <button type='button' className={`${styles.btn} ${styles.google_btn}`} disabled={disabled} onClick={async () => {
            await googleLogin();
        }}>

            <span><FaGoogle /></span>
            <span>Sign in with Google</span>


        </button>


    )
}

export default GoogleBtn;
