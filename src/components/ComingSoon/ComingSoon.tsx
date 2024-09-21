import React from 'react';
import styles from './ComingSoon.module.css'

import Image from "next/image";

import rrrImage from "@/assets/MovieCard/rrr.jpg";
import jokerImage from "@/assets/MovieCard/joker.jpg";
import kalkiImage from "@/assets/MovieCard/kalki.jpg";

const ComingSoon = () => {
    return (
        <div className={styles.container}>
            <p>Coming Soon</p>

            <div className={styles.card_container}>
                <div className={styles.card}>
                    <Image src={rrrImage} alt="RRR" loading='lazy' className={styles.image} />
                    <p className={styles.release_date}>13 Oct 2021</p>

                </div>
                <div className={styles.card}>
                    <Image src={jokerImage} alt="RRR" loading='lazy' className={styles.image} />
                    <p className={styles.release_date}>13 Oct 2021</p>

                </div>
                <div className={styles.card}>
                    <Image src={kalkiImage} alt="RRR" loading='lazy' className={styles.image} />
                    <p className={styles.release_date}>13 Oct 2021</p>

                </div>
                <div className={styles.card}>
                    <Image src={rrrImage} alt="RRR" loading='lazy' className={styles.image} />
                    <p className={styles.release_date}>13 Oct 2021</p>

                </div>
                <div className={styles.card}>
                    <Image src={jokerImage} alt="RRR" loading='lazy' className={styles.image} />
                    <p className={styles.release_date}>13 Oct 2021</p>

                </div>





            </div>


        </div>
    )
}

export default ComingSoon;