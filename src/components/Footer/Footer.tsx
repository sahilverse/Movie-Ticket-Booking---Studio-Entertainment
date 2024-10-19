import React from 'react';

import styles from './Footer.module.css';
import Link from 'next/link';

import Image from 'next/image';


import esewaImage from '@/assets/PaymentPartners/esewa.jpg';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer className={`${styles.footer} main_container `}>
            <div className={styles.container}>

                <div className={styles.logo_container}>
                    <Link className="logo" href='/'>
                        <p>Studio</p>
                        <p>Entertainment</p>
                    </Link>

                    <p>
                        Studio Entertainment offers the best in comfort and viewing.
                        The lobby food court and main concession stands offer a wide variety of movie fares.
                    </p>

                </div>

                <div className={styles.mid}>
                    <p>Quicklinks</p>

                    <div className={styles.links}>
                        <Link href='/booking'>Booking</Link>
                        <Link href='/about'>About Us</Link>
                        <Link href='/tnc'>Terms and Conditions</Link>
                        <Link href='/privacy-policy'>Privacy Policy</Link>
                    </div>

                </div>


                <div className={styles.left}>
                    <p>Payment Partners</p>

                    <div className={styles.partners_container}>


                        <div className={styles.partner_cont}>
                            <Image
                                src={esewaImage}
                                alt="eSewa"
                                className={styles.partner}
                            />

                        </div>


                    </div>

                </div>

            </div>

            <div className={styles.bottom}>
                <p>© {year} Studio Entertainment. All rights reserved.</p>
            </div>

        </footer>
    )
}

export default Footer;