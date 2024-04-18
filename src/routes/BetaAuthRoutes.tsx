import {Navigate, Route, Routes} from 'react-router-dom'
import {BetaRegister} from "../sections/beta-testers/pages/BetaRegister.tsx";
import {BetaAuthLayout} from "../layout/BetaAuthLayout.tsx";
import {BetaLogin} from "../sections/beta-testers/pages/BetaLogin.tsx";
import React from "react";

const BetaAuthRoutes = () => {
    return (
        <Routes>
            <Route element={<BetaAuthLayout />}>
                <Route path='register' element={<BetaRegister/>}/>
                <Route path='login' element={<BetaLogin/>}/>

                <Route index element={<Navigate to='/alpha/auth/login'/>}/>
            </Route>
        </Routes>
    )
}

export {BetaAuthRoutes}
