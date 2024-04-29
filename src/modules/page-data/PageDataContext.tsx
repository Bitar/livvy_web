import {createContext} from "react";

interface PageDataContextProps {
    pageTitle?: string
    setPageTitle: (_title: string) => void
    pageDescription?: string
    setPageDescription: (_description: string) => void
}

export const PageDataContext = createContext<PageDataContextProps>({
    setPageTitle: () => {},
    setPageDescription: () => {},
})