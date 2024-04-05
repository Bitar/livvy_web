import {FC, ReactNode, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useModal} from "../../layout/ModalProvider.tsx";
import clsx from "clsx";

interface Props {
    children: ReactNode
}
export const LivModal: FC<Props> = ({children}) => {
    const {isOpen, setIsOpen} = useModal();
    const [isClosing, setIsClosing] = useState<boolean>(false)

    return (
        <div onAnimationEnd={() => {
            // To filter open animation
            if(isClosing) {
                setIsOpen(false)
                setIsClosing(false)
            }
        }}
            className={clsx('fixed sm:absolute w-full h-full z-30 top-0 left-0 bg-black bg-opacity-50 animate__animated', {
                'hidden': !isOpen,
                'animate__fadeOut': isClosing,
                'animate__fadeIn': isOpen
            })}>
            <div className='absolute z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-full w-full sm:h-auto sm:w-auto px-12 py-8'>
                <button className="absolute top-1.5 right-2 z-50" onClick={() => setIsClosing(true)}><FontAwesomeIcon icon={faXmark} /></button>

                {children}
            </div>
        </div>
    )
}