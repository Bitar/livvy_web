import {useContext} from "react";
import {AuthLayoutProvider} from "./AuthLayoutProvider.tsx";

export const useAuthLayout = () => {
    return useContext(AuthLayoutProvider)
}