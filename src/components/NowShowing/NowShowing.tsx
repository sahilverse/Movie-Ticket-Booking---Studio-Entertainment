import React from 'react'
import styles from './NowShowing.module.css'

const getDateArray = () => {
    const dateArray = [];
    const today = new Date();

    // Push today's date
    dateArray.push("Today");

    // Push tomorrow's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dateArray.push("Tomorrow");

    // Push the next 3 dates
    for (let i = 2; i <= 4; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const formattedDate = nextDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
        });
        dateArray.push(formattedDate);
    }

    return dateArray;
};

const NowShowing = () => {

    const dates = getDateArray();

    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    return (
        <div>
            <div className={styles.container}>
                <p>Now Showing</p>
                <div className={styles.date_container}>

                    {dates.map((date, index) => (
                        <p
                            key={index}
                            className={`date_item ${index === activeIndex ? styles.active : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {date}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default NowShowing