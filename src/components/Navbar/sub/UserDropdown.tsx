"use client"
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import { logout } from '@/actions/login';
import useClickOutside from '@/hooks/useClickOutside';
import useScrollHandler from '@/hooks/useScrollHandler';
import { TStyle } from '@/types/types';
import { set } from 'zod';



const UserDropdown = ({ styles }: { styles: TStyle }) => {

    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);

    const handleDropdown = () => {
        setDropdown(!dropdown);
    };

    const isScroll = useScrollHandler();

    useEffect(() => {
        setDropdown(false);
    }, [isScroll]);

    useClickOutside(dropdownRef, () => {
        setDropdown(false);
    });

    return (
        <div className={`relative ${styles.desktop_only}`}>
            <div className='flex items-center gap-2 cursor-pointer' onClick={handleDropdown}>
                <FaUserCircle size={30} />
            </div>
            {dropdown && (
                <div className='flex flex-col absolute  p-3 z-10 bg-[#1d232a] mt-3 right-2 rounded-md shadow-2xl tracking-wider' ref={dropdownRef}>
                    <Link href='/profile' className='hover:bg-[#ffffff45] px-6 rounded-md py-2 text-sm transition-all duration-300  pr-28'
                        onClick={() => setDropdown(false)}
                    >
                        Profile
                    </Link>
                    <button onClick={async () => await logout()} className='text-sm whitespace-nowrap px-6  py-2 hover:bg-[#ffffff45] rounded-md transition-all duration-300 pr-28'>Logout</button>
                </div >
            )}
        </div >
    );
};



export default UserDropdown;