import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import clsx from "clsx";

export const EnlargedInspiration = ({isOpen, setIsOpen, image}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    image: string
}) => {
    const initialHeight = window.innerHeight - 100;
    const initialWidth = (window.innerWidth <= 640) ? window.innerWidth : window.innerWidth - 100

    const [isClosing, setIsClosing] = useState<boolean>(false)
    const [contentHeight, setContentHeight] = useState<number>(initialHeight);
    const [contentWidth, setContentWidth] = useState<number>(initialWidth);

    const updateContentDimensions = () => {
        setContentHeight(window.innerHeight - 100);

        if(window.innerWidth <= 640) {
            setContentWidth(window.innerWidth);
        } else {
            setContentWidth(window.innerWidth - 100);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            updateContentDimensions();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div onAnimationEnd={() => {
            // To filter open animation
            if (isClosing) {
                setIsOpen(false)
                setIsClosing(false)
            }
        }}
             className={clsx('fixed w-full h-full z-30 top-0 left-0 bg-black bg-opacity-50 animate__animated backdrop-blur-md', {
                 'hidden': !isOpen,
                 'animate__fadeOut': isClosing,
                 'animate__fadeIn': isOpen
             })}>

            <button className={clsx("absolute right-6 top-5 z-50 uppercase text-white border-0 border-b border-b-white text-xs leading-3")} onClick={() => setIsClosing(true)}>close</button>

            <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-url bg-no-repeat bg-center bg-contain" style={{backgroundImage: `url(${image})`, height: contentHeight, width: contentWidth}}></div>
        </div>
    )
}