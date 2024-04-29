import {useContext} from "react";
import {LivvyContext} from "./LivvyAppContext.tsx";

export const useLivvyApp = () => {
    return useContext(LivvyContext)
}