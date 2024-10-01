import React from 'react'
import styles from './LocationPopup.module.css'


const LocationPopup = ({
    setShowLocationPopup
}: {
    setShowLocationPopup: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [cities, setCities] = React.useState<any[]>([])
    const [selectedCity, setSelectedCity] = React.useState<any>("")
    const popUpRef = React.useRef<HTMLDivElement | null>(null)

    // Effect to handle clicks outside the popup to close it
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
                setShowLocationPopup(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [popUpRef])

    // Function to get the list of cities
    const getCities = async () => {
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
    React.useEffect(() => {
        document.body.style.overflowY = 'hidden'

        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [setShowLocationPopup])

    // Effect to fetch cities when the component mounts
    React.useEffect(() => {
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
