import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../sections/auth/core/Auth.tsx";
import {BetaAuthRoutes} from "./BetaAuthRoutes.tsx";
import {BetaVersions} from "../sections/beta-testers/pages/BetaVersions.tsx";
import {BetaLanding} from "../sections/beta-testers/pages/BetaLanding.tsx";

export const BetaRoutes = () => {
    const {currentUser} = useAuth()

    return (
        <Routes>
            {
                currentUser ? (
                    <>
                        <Route path='auth/*' element={<Navigate to={'/alpha/'}/>}/>
                        <Route path='/*' element={<BetaVersions />}/>
                    </>
                ) : (
                    <>
                        <Route path="auth/*" element={<BetaAuthRoutes/>} />
                        <Route path='*' element={<BetaLanding/>}/>
                    </>
                )
            }
        </Routes>
    )
}