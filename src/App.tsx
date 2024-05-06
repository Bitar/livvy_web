import {Outlet} from 'react-router-dom'
import {LivvyApp} from "./sections/auth/core/LivvyApp.tsx";
import {AuthInit} from "./sections/auth/core/Auth.tsx";

export const App = () => {
    return (
        <AuthInit>
            <LivvyApp>
                <Outlet/>
            </LivvyApp>
        </AuthInit>
    )
}