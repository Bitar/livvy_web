import {
    FC,
    useState,
    useEffect,
    useRef,
} from 'react'
import * as authHelper from '../../../helpers/auth.ts'
import {User} from '../../../models/iam/User'
import {Role} from '../../../models/iam/Role';
import {LayoutSplashScreen} from "../../../layout/LivvySplashScreen.tsx";
import {WithChildren} from "../../../helpers/WithChildren.ts";
import {AuthModel} from "../../../models/iam/Auth.tsx";
import {getUserByToken} from "../../../requests/iam/auth.ts";
import {AuthContext} from './AuthContext.tsx';
import {useAuth} from "./Auth.loader.ts";
import {user} from "../../../data/user.ts";

const AuthProvider: FC<WithChildren> = ({children}) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
    //TODO: Dummy Data 'user'
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

    const logout = () => {
        saveAuth(undefined)
        setCurrentUser(undefined)
    }

    const hasRoles = (user: User | undefined, roles: string[]) => {
        // this function will loop over the provided user's roles
        // and returns true if he has all roles (can be used for single case where
        // we need to know if the user has a single role)
        let foundNotExist = false;

        roles.forEach((roleName: string) => {
            // we loop over each role name and we check if the user has it
            let exist = false;

            // we then check if the user has the role
            user?.roles?.forEach((role: Role) => {
                if (role.name === roleName) {
                    exist = true;
                }
            });

            if (!exist) {
                foundNotExist = true;
            }
        });

        return !foundNotExist;
    }

    const hasAnyRoles = (user: User | undefined, roles: string[]) => {
        // this function will loop over the provided user's roles
        // and returns true if he has any of the roles
        let exist = false;

        user?.roles?.forEach((role: Role) => {
            if (roles.includes(role.name)) {
                exist = true;
            }
        });

        return exist;
    }

    return (
        <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, hasRoles, hasAnyRoles}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth, logout, setCurrentUser} = useAuth()
    const didRequest = useRef(false)
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!didRequest.current) {
                    setCurrentUser(user)
                    // const {data} = await getUserByToken(apiToken)
                    //
                    // if (data) {
                    //     setCurrentUser(data)
                    // }
                }
            } catch (error) {
                if (!didRequest.current) {
                    logout()
                }
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }

        if (auth && auth.token) {
            requestUser(auth.token)
        } else {
            logout()
            setShowSplashScreen(false)
        }
        // eslint-disable-next-line
    }, [])

    return showSplashScreen ? <LayoutSplashScreen/> : <>{children}</>
}

export {AuthProvider, AuthInit}
