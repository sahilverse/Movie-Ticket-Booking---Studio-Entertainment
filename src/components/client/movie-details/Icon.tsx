import React from 'react'

interface IconsProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
    text: string
    title: string
}

const Icon = ({ Icon, text, title }: IconsProps) => {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <Icon className="h-4 w-4 text-indigo-400" />
            <span className="font-medium text-gray-400 tracking-wider">{title}:</span>
            <span className='text-gray-400 tracking-wider'>{text}</span>
        </div>
    )
}

export default Icon;

