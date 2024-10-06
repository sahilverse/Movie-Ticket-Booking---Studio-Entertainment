import React from 'react'

import Image from 'next/image';
import signinImage from '@/assets/Signin/signin.webp';

const FormImage = ({ styles }: { styles: Record<string, string> }) => {
    return (

        <div className={styles.img_container}>
            <Image
                src={signinImage}
                alt="Form Image"
                priority={true}
                className={styles.img}
            />

        </div>
    )
}

export default FormImage;