"use client"
import React, { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Link from 'next/link';
import { FaUser, FaLocationDot } from "react-icons/fa6";
import { TStyle } from '@/types/types';
import useClickOutside from '@/hooks/useClickOutside';
import { logout } from '@/actions/login';
import { useCurrentUser } from '@/hooks/useCurrentUser';


const MobileNav = ({ styles }: { styles: TStyle }) => {
    const [isHamOpen, setIsHamOpen] = useState(false);
    const mobileNavRef = useRef<HTMLDivElement | null>(null);

    const { user } = useCurrentUser();

    useClickOutside(mobileNavRef, () => setIsHamOpen(false));

    return (
        <div className={`flex gap-4 items-center ${styles.mobile_only}`}>
            <FaLocationDot className='text-[21px]' onClick={() => setIsHamOpen(true)} />
            {user ?
                <Link href="/profile">
                    <FaUser className='text-[21px]' />
                </Link>
                : <Link href="/login">
                    <FaUser className='text-[21px]' />
                </Link>}
            <div className={styles.hamburger_menu} onClick={() => setIsHamOpen(!isHamOpen)}>
                {isHamOpen ? <RxCross2 className='text-3xl' /> : <RxHamburgerMenu className='text-3xl' />}
            </div>

            {isHamOpen && (
                <div className={`${styles.mobile_nav} ${styles.active_mobile_nav}`} ref={mobileNavRef}>
                    <ul className={styles.mobile_nav_links}>
                        <li className={styles.mobile_nav_link}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={styles.mobile_nav_link}>
                            <Link href="/movies">Movies</Link>
                        </li>
                        {user && <li className={styles.mobile_nav_link}>
                            <Link href="/my-tickets">My Tickets</Link>
                        </li>}

                        <li className={styles.mobile_nav_link}>
                            <Link href="/ticketrates">Ticket Rates</Link>
                        </li>
                        {user &&

                            <li className={styles.mobile_nav_link}>
                                <button onClick={async () => await logout()}>Sign Out</button>
                            </li>
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileNav;
