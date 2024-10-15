"use client"

import { TStyle, TUser } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({ styles, user }: { styles: TStyle, user: TUser }) => {
    const pathname = usePathname();


    return (
        <div className={styles.large_nav}>
            <ul className={styles.nav_links}>
                <li className={styles.nav_link}>
                    <Link href="/" className={pathname === '/' ? styles.activeLink : ""}>
                        Home
                    </Link>
                </li>
                <li className={styles.nav_link}>
                    <Link href="/movies" className={pathname === '/movies' ? styles.activeLink : ""}>
                        Movies
                    </Link>
                </li>

                {user && (
                    <li className={styles.nav_link}>
                        <Link href="/my-tickets" className={pathname === '/my-tickets' ? styles.activeLink : ""}>
                            My Tickets
                        </Link>
                    </li>
                )}
                <li className={styles.nav_link}>
                    <Link href="/ticketrates" className={pathname === '/ticketrates' ? styles.activeLink : ""}>
                        Ticket Rates
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavLinks;
