import React from 'react'


interface LoginBtnProps {
    type: string;
    styles: Record<string, string>
    disabled?: boolean
}


const LoginBtn: React.FC<LoginBtnProps> = ({ type, styles, disabled }) => {
    return (


        <button type='submit' className={styles.btn} disabled={disabled}>{type}</button>


    )
}

export default LoginBtn;