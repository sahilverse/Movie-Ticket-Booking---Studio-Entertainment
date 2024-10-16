"use client";

import { TStyle, TUser } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({ styles, user }: { styles: TStyle, user: TUser }) => {
    const pathname = usePathname();


    const isActive = (path: string) => pathname === path ? styles.activeLink : '';


    const links = [
        { href: '/', label: 'Home' },
        { href: '/movies', label: 'Movies' },
        ...(user ? [{ href: '/my-tickets', label: 'My Tickets' }] : []),
        { href: '/ticketrates', label: 'Ticket Rates' }
    ];

    return (
        <div className={styles.large_nav}>
            <ul className={styles.nav_links}>
                {links.map(link => (
                    <li key={link.href} className={styles.nav_link}>
                        <Link href={link.href} className={isActive(link.href)}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavLinks;
