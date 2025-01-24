import React from 'react'

import Image from 'next/image';
import signinImage from '@/assets/Signin/signin.webp';
import { TStyle } from '@/types/types';

const FormImage = ({ styles }: { styles: TStyle }) => {
    return (

        <div className={styles.img_container}>
            <Image
                src={signinImage}
                alt="Form Image"
                priority
                className={styles.img}
            />

        </div>
    )
}

export default FormImage;