import React, {FC} from 'react'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import {useAuth} from "../sections/auth/core/Auth.loader.ts";
import {ErrorsPage} from "../layout/errors/ErrorsPage.tsx";
import {App} from "../App.tsx";
import {Logout} from "../sections/auth/core/Logout.tsx";
import {AuthRoutes} from "./AuthRoutes.tsx";
import {PrivateRoutes} from "./PrivateRoutes.tsx";
import {AlphaRoutes} from "./AlphaRoutes.tsx";

// const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {
    const APP_ENV = import.meta.env.VITE_APP_ENV;

    const {currentUser} = useAuth()

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<App/>}>
                <Route path='error/*' element={<ErrorsPage/>}/>
                <Route path='logout/*' element={<Logout/>}/>

                <Route path='alpha/*' element={<AlphaRoutes/>}/>

                {
                    APP_ENV === 'production' && (
                        <Route path='*' element={<Navigate to='/alpha/'/>}/>
                    )
                }

                {
                    APP_ENV !== 'production' && (
                        <>
                            {currentUser ? (
                                <>
                                    <Route path='*' element={<PrivateRoutes/>}/>
                                </>
                            ) : (
                                <>
                                    <Route path='auth/*' element={<AuthRoutes/>}/>
                                    <Route path='*' element={<Navigate to='/auth'/>}/>
                                </>
                            )}
                        </>
                    )
                }
            </Route>
        )
    );

    return (
        <RouterProvider router={router}/>
    )
}

export {AppRoutes}
