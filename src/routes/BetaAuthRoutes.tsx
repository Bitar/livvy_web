import {Navigate, Route, Routes} from 'react-router-dom'
import {BetaRegister} from "../sections/beta-testers/pages/BetaRegister.tsx";
import {BetaAuthLayout} from "../layout/BetaAuthLayout.tsx";
import {BetaLogin} from "../sections/beta-testers/pages/BetaLogin.tsx";
import React from "react";

const BetaAuthRoutes = () => {
    return (
        <Routes>
            <Route element={<BetaAuthLayout />}>
                {/*<Route path='login' element={<Login/>}/>*/}
                {/*<Route path='register' element={<Register/>}/>*/}
                {/*<Route path='reset-password' element={<ResetPassword/>}/>*/}
                {/*<Route path='forgot-password' element={<ForgotPassword/>}/>*/}
                {/*<Route path='reset-password' element={<ResetPassword/>}/>*/}
                <Route path='register' element={<BetaRegister/>}/>
                <Route path='login' element={<BetaLogin/>}/>

                <Route index element={<Navigate to='/beta/auth/login'/>}/>
            </Route>
        </Routes>
    )
}

export {BetaAuthRoutes}
