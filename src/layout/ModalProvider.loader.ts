import {useContext} from "react";
import {ModalProvider} from "./ModalProvider.tsx";

export const useModal = () => {
    return useContext(ModalProvider);
}