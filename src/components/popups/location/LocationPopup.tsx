import React, { useEffect } from 'react'
import styles from './LocationPopup.module.css'
import useClickOutside from '@/hooks/useClickOutside'


const LocationPopup = ({
    setShowLocationPopup
}: {
    setShowLocationPopup: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [cities, setCities] = React.useState<any[]>([])
    const [selectedCity, setSelectedCity] = React.useState<any>("")
    const popUpRef = React.useRef<HTMLDivElement | null>(null)



    useClickOutside(popUpRef, () => setShowLocationPopup(false))

    // TODO:  Fetching Cities from the backend
    const getCities = () => {
        const nepaliCities = [
            "Kathmandu",
            "Pokhara",
            "Bhaktapur",
            "Lalitpur",
            "Biratnagar",
            "Dharan",
            "Birgunj",
            "Butwal",
            "Hetauda",
            "Itahari"
        ];

        const cities = nepaliCities.map((city) => {
            return {
                label: city,
                value: city
            }
        })

        setCities(cities)
    }

    // Effect to disable body scroll when the popup is open
    useEffect(() => {
        document.body.style.overflowY = 'hidden'

        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [setShowLocationPopup])

    // Effect to fetch cities when the component mounts
    useEffect(() => {
        getCities()
    }, [])

    return (
        <div className={styles.popup_bg} >
            <div className={styles.popup_cont} ref={popUpRef}>
                <p>Select Your Location</p>
                <select
                    className='select'
                    onChange={(e) => {
                        setSelectedCity(e.target.value)
                    }}
                    value={selectedCity || 'Select City'}
                >
                    {
                        cities.map((city: any) => {
                            return <option key={city.value} value={city.value}>{city.label}</option>
                        })
                    }
                </select>

                <button className={styles.save_btn}
                    onClick={() => {
                        setShowLocationPopup(false)
                    }}
                >Save</button>
            </div>
        </div>
    )
}

export default LocationPopup
