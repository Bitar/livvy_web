import {useContext} from "react";
import {PageDataContext} from "./PageDataContext.tsx";

export const usePageData = () => {
    return useContext(PageDataContext)
}