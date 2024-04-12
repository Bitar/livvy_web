import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../sections/auth/core/Auth.tsx";
import {BetaAuthRoutes} from "./BetaAuthRoutes.tsx";
import {BetaVersions} from "../sections/beta-testers/pages/BetaVersions.tsx";

export const BetaRoutes = () => {
    const {currentUser} = useAuth()

    console.log(currentUser);
    return (
        <Routes>
            {
                currentUser ? (
                    <>
                        <Route path='auth/*' element={<Navigate to={'/beta/'}/>}/>
                        <Route path='/*' element={<BetaVersions />}/>
                    </>
                ) : (
                    <>
                        <Route path="auth/*" element={<BetaAuthRoutes/>} />
                        <Route path='*' element={<Navigate to='/beta/auth'/>}/>
                    </>

                )
            }
        </Routes>
    )
}