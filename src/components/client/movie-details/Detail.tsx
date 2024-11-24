import React from 'react'

const Detail = ({ detailOf, text }: { detailOf: string, text: string }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-1">
            <span className="font-medium text-sm text-zinc-400 font-roboto tracking-wider sm:min-w-24">{detailOf}:</span>
            <span className='text-gray-400 text-sm font-roboto tracking-wider'>{text}</span>
        </div>
    )
}

export default Detail;

