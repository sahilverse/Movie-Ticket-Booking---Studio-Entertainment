import React from 'react'
import ComingSoon from '@/components/comingSoon/ComingSoon';
import NowShowing from '@/components/nowShowing/NowShowing';



const MoviePage = () => {
    return (
        <main className='main_container'>

            <NowShowing />

            <ComingSoon />


        </main>
    )
}

export default MoviePage;