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

        <header className={`${isScroll && styles.scrolled}`}>
            {children}
        </header>
    )


}


export default ClientScrollHandler;





