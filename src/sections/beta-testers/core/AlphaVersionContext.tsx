import {createContext, Dispatch, SetStateAction} from "react";

export const AppVersionLayoutContext = createContext<{ setShowTypeForm: Dispatch<SetStateAction<boolean>> }>({
    setShowTypeForm: () => {
    }
})