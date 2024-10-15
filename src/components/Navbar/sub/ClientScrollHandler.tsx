'use client'

import useScrollHandler from '@/hooks/useScrollHandler';
import { TStyle } from '@/types/types';
import React from 'react';

interface ClientScrollHandlerProps {
    children: React.ReactNode;
    styles: TStyle

}

const ClientScrollHandler = ({ children, styles }: ClientScrollHandlerProps) => {
    const isScroll = useScrollHandler();

    return (

        <div className={`${isScroll && styles.scrolled}`}>
            {children}
        </div>
    )


}


export default ClientScrollHandler;





