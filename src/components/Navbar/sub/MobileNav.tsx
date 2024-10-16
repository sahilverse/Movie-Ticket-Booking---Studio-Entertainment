"use client"
import React, { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Link from 'next/link';
import { FaUser, FaLocationDot } from "react-icons/fa6";
import { TStyle, TUser } from '@/types/types';
import useClickOutside from '@/hooks/useClickOutside';
import { logout } from '@/actions/login';
import toast from 'react-hot-toast';




const MobileNav = ({ styles, user }: { styles: TStyle, user: TUser }) => {
    const [isHamOpen, setIsHamOpen] = useState(false);
    const mobileNavRef = useRef<HTMLDivElement | null>(null);



    useClickOutside(mobileNavRef, () => setIsHamOpen(false));

    useEffect(() => {

        if (isHamOpen) {

            document.body.style.overflowY = 'hidden'
        }

        return () => {
            document.body.style.overflowY = 'scroll'
        }
    }, [isHamOpen])

    return (
        <div className={`flex gap-4 items-center relative ${styles.mobile_only}`}>
            <FaLocationDot className='text-[21px]' onClick={() => setIsHamOpen(true)} />
            {user ?
                <Link href="/profile">
                    <FaUser className='text-[21px]' />
                </Link>
                : <Link href="/login">
                    <FaUser className='text-[21px]' />
                </Link>}
            <div className={styles.hamburger_menu} onClick={() => setIsHamOpen(prev => !prev)}>
                <RxHamburgerMenu className='text-3xl' />
            </div>


            <nav className={`${styles.mobile_nav} ${isHamOpen && styles.active_mobile_nav}  `} ref={mobileNavRef} onClick={() => setIsHamOpen(false)}>
                <div className={styles.close_mobile_nav} onClick={() => setIsHamOpen(false)}>
                    <RxCross2 className='text-3xl' />
                </div>
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
                            <button onClick={async () => {
                                const toastId = toast.loading("Logging Out...");
                                await logout();
                                toast.dismiss(toastId);

                            }}>Logout</button>
                        </li>
                    }
                </ul>
            </nav>

        </div>
    );
};

export default MobileNav;
