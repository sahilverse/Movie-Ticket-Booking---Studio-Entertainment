"use client";
import React, { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Link from 'next/link';
import { FaUser, FaLocationDot } from "react-icons/fa6";
import { TStyle } from '@/types/types';
import useClickOutside from '@/hooks/useClickOutside';
import { logout } from '@/actions/login';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { User } from '@prisma/client';


const MobileNav = ({ styles, user }: { styles: TStyle, user: User }) => {
    const [isHamOpen, setIsHamOpen] = useState(false);
    const mobileNavRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();



    useClickOutside(mobileNavRef, () => setIsHamOpen(false));


    useEffect(() => {
        document.body.style.overflowY = isHamOpen ? 'hidden' : 'scroll';
        return () => {
            document.body.style.overflowY = 'scroll';
        };
    }, [isHamOpen]);


    const isActive = (path: string) => pathname === path ? styles.activeLink : '';


    const links = [
        { href: '/', label: 'Home' },
        { href: '/movies', label: 'Movies' },
        ...(user ? [{ href: '/my-tickets', label: 'My Tickets' }] : []),
        { href: '/ticketrates', label: 'Ticket Rates' },
        ...(!user ? [{ href: '/login', label: 'Login' }] : []),
    ];

    return (
        <div className={`flex gap-4 items-center relative ${styles.mobile_only}`}>
            <Link href={user ? "/profile" : "/login"}>
                <FaUser className='text-[21px]' />
            </Link>
            <div className={styles.hamburger_menu} onClick={() => setIsHamOpen(prev => !prev)}>
                <RxHamburgerMenu className='text-3xl' />
            </div>

            <nav
                className={`${styles.mobile_nav} ${isHamOpen && styles.active_mobile_nav}`}
                ref={mobileNavRef}
            >
                <div className={styles.close_mobile_nav} onClick={() => setIsHamOpen(false)}>
                    <RxCross2 className='text-3xl' />
                </div>

                <ul className={styles.mobile_nav_links} onClick={() => setIsHamOpen(false)}>
                    {links.map(link => (
                        <li key={link.href} className={`${styles.mobile_nav_link}`}>
                            <Link href={link.href} className={isActive(link.href)}>
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {user && (
                        <li className={styles.mobile_nav_link}>
                            <button
                                onClick={async () => {
                                    const toastId = toast.loading("Logging Out...");
                                    await logout();
                                    toast.dismiss(toastId);
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

        </div>
    );
};

export default MobileNav;
