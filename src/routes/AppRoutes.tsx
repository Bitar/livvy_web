import {FC} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {useAuth} from "../sections/auth/core/Auth.tsx";
import {ErrorsPage} from "../layout/errors/ErrorsPage.tsx";
import {App} from "../App.tsx";
import {Logout} from "../sections/auth/core/Logout.tsx";
import {AuthRoutes} from "./AuthRoutes.tsx";

const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {
    const {currentUser} = useAuth()

    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route element={<App/>}>
                    <Route path='error/*' element={<ErrorsPage/>}/>
                    <Route path='logout' element={<Logout/>}/>
                    {currentUser ? (
                        <>
                            {/*<Route path='/*' element={<PrivateRoutes/>}/>*/}
                            <Route index element={<Navigate to='/dashboard'/>}/>
                        </>
                    ) : (
                        <>
                            <Route path='auth/*' element={<AuthRoutes/>}/>
                            <Route path='*' element={<Navigate to='/auth'/>}/>
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export {AppRoutes}
