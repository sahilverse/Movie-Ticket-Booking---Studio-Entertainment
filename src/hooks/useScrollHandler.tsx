import { useEffect, useState } from 'react';


// This hook is used to detect if a user has scrolled down the page
const useScrollHandler = () => {
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY >= 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return isScroll;
};

export default useScrollHandler;
