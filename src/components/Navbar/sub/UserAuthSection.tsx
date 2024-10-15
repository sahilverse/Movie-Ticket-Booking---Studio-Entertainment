import Link from 'next/link';
import React from 'react';
import { TStyle } from '@/types/types';
import { currentUser } from '@/lib/auth';
import UserDropdown from './UserDropdown';




const UserAuthSection = async ({ styles }: { styles: TStyle }) => {

    const user = await currentUser();


    return (
        user ? (
            <UserDropdown styles={styles} />
        ) : (
            <Link className={styles.nav_signin_btn} href='/login'>
                <span > Sign In</span >
            </Link >
        )
    );
};

export default UserAuthSection;
