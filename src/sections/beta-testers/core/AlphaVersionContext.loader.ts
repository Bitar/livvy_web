import {useContext} from "react";
import {AppVersionLayoutContext} from "./AlphaVersionContext.tsx";

export const useAppVersion = () => {
    return useContext(AppVersionLayoutContext)
}