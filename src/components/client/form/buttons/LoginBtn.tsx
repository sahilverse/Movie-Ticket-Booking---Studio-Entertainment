import { TStyle } from '@/types/types';
import React from 'react'


interface LoginBtnProps {
    type: string;
    styles: TStyle
    disabled?: boolean
}


const LoginBtn: React.FC<LoginBtnProps> = ({ type, styles, disabled }) => {
    return (


        <button type='submit' className={styles.btn} disabled={disabled}>{type}</button>


    )
}

export default LoginBtn;