import React from 'react'

const NoShowsAvailable = () => {
    return (
        <section className=" mt-10">
            <div className="flex items-center justify-center w-full bg-yellowShade p-6 xl:p-8 rounded-lg backdrop-blur-md">
                <p className="font-bold tracking-wider text-black text-lg">No Shows Available</p>
            </div>
        </section>
    )
}

export default NoShowsAvailable;