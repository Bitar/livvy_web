import {Outlet} from 'react-router-dom'
import {AuthInit} from "./sections/auth/core/Auth.tsx";
import {LivvyApp} from "./sections/auth/core/LivvyApp.tsx";

export const App = () => {

    return (
        <>
            <AuthInit>
                <LivvyApp>
                    <Outlet/>
                </LivvyApp>
            </AuthInit>
        </>
    )
}