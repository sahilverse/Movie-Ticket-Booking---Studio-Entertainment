import React from 'react';
import styles from './Navbar.module.css';
import Logo from './sub/Logo';
import NavLinks from './sub/NavLinks';
import UserAuthSection from './sub/UserAuthSection';
import MobileNav from './sub/MobileNav';
import ClientScrollHandler from './sub/ClientScrollHandler';
import { currentUser } from '@/lib/auth';
import { User } from '@prisma/client';


const Navbar = async () => {

    const user: User = await currentUser();

    return (
        <ClientScrollHandler styles={styles}>
            <div className="main_container mt-4 pb-2">
                <nav className={styles.navbar}>
                    <Logo />
                    <NavLinks styles={styles} user={user} />
                    <div className='flex items-center gap-8 '>

                        <UserAuthSection styles={styles} />
                    </div>
                    <MobileNav styles={styles} user={user} />
                </nav>
            </div>
        </ClientScrollHandler>
    );
};

export default Navbar;
