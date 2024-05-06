import {Outlet} from 'react-router-dom'
import {LivvyApp} from "./sections/auth/core/LivvyApp.tsx";
import {AuthInit} from "./sections/auth/core/Auth.tsx";
import {StagingPages} from "./sections/staging/StagingPages.tsx";

export const App = () => {
    const APP_ENV = import.meta.env.VITE_APP_ENV;

    return (
        <AuthInit>
            <LivvyApp>
                <Outlet/>

                {
                    APP_ENV !== 'production' && <StagingPages/>
                }
            </LivvyApp>
        </AuthInit>
    )
}