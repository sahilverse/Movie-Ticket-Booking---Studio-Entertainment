import React from 'react'
import { BsExclamationTriangle } from "react-icons/bs";





const FormError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
        <div className='flex gap-x-2 items-center text-sm rounded-md bg-[#fc808086] p-2  text-[red]'>
            <span>
                <BsExclamationTriangle className='w-4 h-4' />
            </span>
            <p>{message}</p>
        </div>
    )
}

export default FormError;