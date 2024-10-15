import React, { use } from 'react';
import styles from './TrailerPopup.module.css';
import { RxCross2 } from 'react-icons/rx';
import useClickOutside from '@/hooks/useClickOutside';

const TrailerPopup = ({
    setShowTrailer,
    src,
}: {
    setShowTrailer: React.Dispatch<React.SetStateAction<boolean>>;
    src: string;
}) => {
    const youtubeUrlEmbed = (url: string) => {
        if (url.includes('embed')) {
            return url;
        }
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    const popUpRef = React.useRef<HTMLDivElement | null>(null);

    useClickOutside(popUpRef, () => setShowTrailer(false));

    React.useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [setShowTrailer]);

    const handleClose = () => {
        setShowTrailer(false);
    };

    return (
        <div className={styles.popup_bg}>
            <div className={styles.popup} ref={popUpRef}>
                <div className={`${styles.popup_close} cursor-pointer`} onClick={handleClose}>
                    <RxCross2 className="text-4xl" />
                </div>
                <div className={styles.iframe_container}>
                    <iframe
                        src={youtubeUrlEmbed(src)}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default TrailerPopup;
