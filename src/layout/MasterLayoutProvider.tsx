import {createContext, useContext} from "react";

interface MasterLayoutProviderProps {
    showHeader?: boolean
    setShowHeader?: (show: boolean) => void,
    showFooter?: boolean
    setShowFooter?: (show: boolean) => void
}

export const MasterLayoutProvider = createContext<MasterLayoutProviderProps>({
    showHeader: true,
    setShowHeader: () => {},
    showFooter: true,
    setShowFooter: () => {}
})

export const useMasterLayout = () => {
    return useContext(MasterLayoutProvider)
}