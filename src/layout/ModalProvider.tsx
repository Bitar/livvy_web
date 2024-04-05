import {createContext, Dispatch, SetStateAction, useContext} from "react";

interface ModalProviderProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalProvider = createContext<ModalProviderProps>({
    isOpen: false,
    setIsOpen: () => {
    }
})

export const useModal = () => {
    return useContext(ModalProvider);
}