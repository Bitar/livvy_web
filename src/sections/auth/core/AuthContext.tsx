import {AuthModel} from "../../../models/iam/Auth.tsx";
import {User} from "../../../models/iam/User.ts";
import {createContext, Dispatch, SetStateAction} from "react";
import * as authHelper from "../../../helpers/auth.ts";

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: User | undefined
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>
    logout: () => void,
    hasRoles: (user: User | undefined, roles: string[]) => boolean,
    hasAnyRoles: (user: User | undefined, roles: string[]) => boolean
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => {
    },
    currentUser: undefined,
    setCurrentUser: () => {
    },
    logout: () => {
    },
    hasRoles: () => false,
    hasAnyRoles: () => false
}

export const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)