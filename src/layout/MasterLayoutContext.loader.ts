import {useContext} from "react";
import {MasterLayoutContext} from "./MasterLayoutContext.tsx";

export const useMasterLayout = () => {
    return useContext(MasterLayoutContext)
}