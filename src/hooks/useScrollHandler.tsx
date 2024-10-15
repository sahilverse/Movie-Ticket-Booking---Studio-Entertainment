import { useEffect, useState } from 'react';

const useScrollHandler = () => {
    const [isScroll, setIsScroll] = useState<boolean>(false);

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
