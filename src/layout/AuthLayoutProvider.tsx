import {createContext, Dispatch, SetStateAction, useContext} from "react";

interface Props {
    isPanelOpen: boolean,
    setIsPanelOpen: Dispatch<SetStateAction<boolean>>,
    closePanels: () => void
}

export const AuthLayoutProvider = createContext<Props>({
    isPanelOpen: false,
    setIsPanelOpen: () => {},
    closePanels: () => {}
})

export const useAuthLayout = () => {
    return useContext(AuthLayoutProvider)
}