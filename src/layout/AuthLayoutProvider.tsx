import {createContext, Dispatch, SetStateAction} from "react";

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

