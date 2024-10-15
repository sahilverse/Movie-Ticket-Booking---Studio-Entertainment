import React from 'react';
import styles from './Navbar.module.css';
import Logo from './sub/Logo';
import NavLinks from './sub/NavLinks';
import LocationSelector from './sub/LocationSelector';
import UserAuthSection from './sub/UserAuthSection';
import MobileNav from './sub/MobileNav';
import ClientScrollHandler from './sub/ClientScrollHandler';
import { currentUser } from '@/lib/auth';


const Navbar = async () => {

    const user = await currentUser();

    return (
        <ClientScrollHandler styles={styles}>
            <div className="main_container mt-4 pb-2">
                <nav className={styles.navbar}>
                    <Logo />
                    <NavLinks styles={styles} user={user} />
                    <div className='flex items-center gap-8 '>
                        <LocationSelector styles={styles} />
                        <UserAuthSection styles={styles} />
                    </div>
                    <MobileNav styles={styles} />
                </nav>
            </div>
        </ClientScrollHandler>
    );
};

export default Navbar;
