import {FC, useState} from "react";
import {WithChildren} from "../../helpers/WithChildren.ts";
import {PageDataContext} from "./PageDataContext.tsx";

export const PageDataProvider: FC<WithChildren> = ({children}) => {
    const [pageTitle, setPageTitle] = useState<string>('')
    const [pageDescription, setPageDescription] = useState<string>('')

    return (
        <PageDataContext.Provider value={{
            pageTitle,
            setPageTitle,
            pageDescription,
            setPageDescription
        }}>
            {children}
        </PageDataContext.Provider>
    )
}