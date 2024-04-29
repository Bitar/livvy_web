import {createContext, Dispatch, SetStateAction} from "react";

interface ModalProviderProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalProvider = createContext<ModalProviderProps>({
    isOpen: false,
    setIsOpen: () => {
    }
})