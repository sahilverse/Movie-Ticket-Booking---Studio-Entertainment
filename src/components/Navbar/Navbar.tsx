"use client";
import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";



const Navbar = () => {

    const pathname = usePathname();
    const [isHamOpen, setIsHamOpen] = React.useState<boolean>(false);

    const mobileNavRef = React.useRef<HTMLDivElement | null>(null);


    // Close hamburger menu if clicked outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
                setIsHamOpen(false); // Close the menu if clicked outside
            }
        };

        // Attach the event listener to detect outside clicks
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileNavRef]);

    return (
        <div>
            <div className="main_container mt-8">
                <nav className={styles.navbar}>
                    <Link className={styles.logo} href='/'>
                        <p>Studio</p>
                        <p>Entertainment</p>
                    </Link>
                    {/* Large Screen Navigation */}
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
                            <li className={styles.nav_link}>
                                <Link href="/ticketrates" className={pathname === '/ticketrates' ? styles.activeLink : ""}>
                                    Ticket Rates
                                </Link>
                            </li>
                        </ul>
                    </div>



                    <div>
                        <Link className={styles.nav_signin_btn} href='/signin'><span>Sign In</span></Link>
                    </div>





                    {/* Mobile navigation */}

                    <div className={styles.hamburger_menu}
                        onClick={() => setIsHamOpen(!isHamOpen)}
                    >

                        {
                            isHamOpen ? < RxCross2 className='text-3xl' /> : <RxHamburgerMenu className='text-3xl' />
                        }

                    </div>



                    <div className={`${styles.mobile_nav} ${isHamOpen ? styles.active_mobile_nav : " "}`} ref={mobileNavRef}>
                        <ul className={styles.mobile_nav_links}>
                            <li className={styles.mobile_nav_link}>
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className={styles.mobile_nav_link}>
                                <Link href="/movies">
                                    Movies
                                </Link>
                            </li>
                            <li className={styles.mobile_nav_link}>
                                <Link href="/ticketrates">
                                    Ticket Rates
                                </Link>
                            </li>
                        </ul>

                    </div>




                </nav>
            </div >
        </div >
    );
}

export default Navbar;
