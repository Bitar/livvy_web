import {createContext, Dispatch, SetStateAction} from "react";
import {LivvyToastType} from "../../../helpers/variables.ts";

type Alert = {
    message: string
    type: LivvyToastType
}

type LivvyContextProps = {
    alert: Alert | undefined
    setAlert: Dispatch<SetStateAction<Alert | undefined>>
    pageTitle: string | undefined
    setPageTitle: Dispatch<SetStateAction<string>>
}

const initLivvyContextPropsState = {
    alert: undefined,
    setAlert: () => {
    },
    setPageTitle: () => {
    },
    pageTitle: undefined,
}

export const LivvyContext = createContext<LivvyContextProps>(initLivvyContextPropsState)