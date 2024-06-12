import {FC, ReactNode, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useModal} from "../../layout/ModalProvider.loader.ts";
import clsx from "clsx";

interface Props {
    bgColor?: string,
    showClose?: boolean,
    children: ReactNode
}
export const LivModal: FC<Props> = ({bgColor = "bg-white", showClose = true, children}) => {
    const {isOpen, setIsOpen} = useModal();
    const [isClosing, setIsClosing] = useState<boolean>(false);

    return (
        <div onAnimationEnd={() => {
            // To filter open animation
            if(isClosing) {
                setIsOpen(false)
                setIsClosing(false)
            }
        }}
            className={clsx(`fixed w-full h-full z-40 top-0 left-0 bg-black bg-opacity-50 animate__animated backdrop-blur-md`, {
                'hidden': !isOpen,
                'animate__fadeOut': isClosing,
                'animate__fadeIn': isOpen
            })}>
            <div className={clsx(`fixed top-0 left-0 overflow-y-scroll sm:overflow-y-hidden sm:absolute z-40 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 h-full mobile-w-full sm:h-auto` +
                ' px-8 sm:px-12' +
                ` py-8 ${bgColor}`)}>
                {
                    showClose && <button className={clsx("absolute top-1.5 z-50 right-2")} onClick={() => setIsClosing(true)}><FontAwesomeIcon icon={faXmark}/></button>
                }

                {children}
            </div>
        </div>
    )
}