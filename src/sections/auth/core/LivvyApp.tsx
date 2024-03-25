import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from "react";
import toast, {Toaster, ToastOptions} from 'react-hot-toast'
import {WithChildren} from "../../../layout/WithChildren.ts";
import {LivvyToastType} from "../../../helpers/variables.ts";
import PendingIcon from "../../../components/icons/Pending.tsx";

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

const LivvyContext = createContext<LivvyContextProps>(initLivvyContextPropsState)

export const useLivvyApp = () => {
    return useContext(LivvyContext)
}

export const LivvyApp: FC<WithChildren> = ({children}) => {
    const [alert, setAlert] = useState<Alert | undefined>(undefined)
    const [pageTitle, setPageTitle] = useState<string>('')

    const color = {
        success: '#50cd89',
        error: '#f1416c',
        pending: '#d5441c',
        warning: '#FFA800',
    }

    const type = {
        success: alert?.type,
        error: alert?.type,
        pending: 'success',
        warning: alert?.type,
    }

    const icon = {
        pending: <PendingIcon/>,
        warning: '⚠️',
    }

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    useEffect(() => {
        if (alert !== undefined) {
            const options: ToastOptions = {
                    id: `alert-${alert.type}`,
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        border: '1px solid ' + (color as any)[alert.type],
                        padding: '16px',
                        color: '#000000',
                    },
                    iconTheme: {
                        primary: (color as any)[alert.type],
                        secondary: '',
                    },
                    ...(alert.type in icon ? {icon: (icon as any)[alert.type]} : {}),
                }
            ;(toast as any)[(type as any)[alert.type]](alert.message, options)
        }
    }, [alert])

    return (
        <LivvyContext.Provider value={{alert, setAlert, pageTitle, setPageTitle}}>
            {children}
            <Toaster/>
        </LivvyContext.Provider>
    )
}