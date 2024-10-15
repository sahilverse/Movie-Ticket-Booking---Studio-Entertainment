import { TStyle } from '@/types/types';
import React from 'react'



const ErrorText = (

    { styles, message }: { styles: TStyle, message?: string }
) => {
    if (!message) return null;
    return (
        <p className={styles.error_message}>{message}</p>
    )
}

export default ErrorText;