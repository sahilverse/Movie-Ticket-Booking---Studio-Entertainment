import React from 'react';
import { BsExclamationTriangle } from "react-icons/bs";
import { RxCross2 } from 'react-icons/rx';

interface FormErrorProps {
    message?: string;
    setCloseError: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormError: React.FC<FormErrorProps> = ({ message, setCloseError }) => {
    const handleClick = () => {
        setCloseError(false);
    };

    if (!message) return null;

    return (
        <div className='text-sm rounded-md bg-[#fc808086] p-2 text-[red] flex items-center justify-between'>
            <div className='flex gap-x-2 items-center'>
                <BsExclamationTriangle className='w-4 h-4' />
                <p>{message}</p>
            </div>
            <RxCross2 className='w-4 h-4 cursor-pointer' onClick={handleClick} />
        </div>
    );
};

export default FormError;
