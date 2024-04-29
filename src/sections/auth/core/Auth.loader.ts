import {useContext} from "react";
import {AuthContext} from "./AuthContext.tsx";

export const useAuth = () => {
    return useContext(AuthContext)
}