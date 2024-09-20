import { useRouter } from 'next/navigation'
import React from 'react'
import styles from './MovieCard.module.css'
import Image from 'next/image'


const MovieCard: React.FC<any> = (data) => {
    const { _id, imageUrl, name, playtime } = data.movie
    const router = useRouter();

    return (


        <div className='mt-10 mb-40 cursor-pointer' onClick={
            () => router.push(`/movie/${_id}`)
        }>
            <div className={styles.movie_card}>
                <div className={styles.image_container}>
                    <Image src={imageUrl} alt={name} loading='lazy' className={styles.image} />
                </div>



            </div>

        </div>
    )
}

export default MovieCard