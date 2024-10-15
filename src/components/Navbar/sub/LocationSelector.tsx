"use client"
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import LocationPopup from '@/components/popups/location/LocationPopup';
import { TStyle } from '@/types/types';

const LocationSelector = ({ styles }: { styles: TStyle }) => {
    const [showLocationPopup, setShowLocationPopup] = useState(false);

    return (
        <>
            <div className={styles.location_container} onClick={() => setShowLocationPopup(true)}>
                <span className={styles.location}>Kathmandu</span>
                <IoIosArrowDown className="text-sm" />
            </div>

            {showLocationPopup && <LocationPopup setShowLocationPopup={setShowLocationPopup} />}
        </>
    );
};

export default LocationSelector;
