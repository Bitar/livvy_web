import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../sections/auth/core/Auth.tsx";
import {AlphaAuthRoutes} from "./AlphaAuthRoutes.tsx";
import {AlphaVersions} from "../sections/beta-testers/pages/AlphaVersions.tsx";
import {AlphaLanding} from "../sections/beta-testers/pages/AlphaLanding.tsx";

export const AlphaRoutes = () => {
    const {currentUser} = useAuth()

    return (
        <Routes>
            {
                currentUser ? (
                    <>
                        <Route path='auth/*' element={<Navigate to={'/alpha/'}/>}/>
                        <Route path='/*' element={<AlphaVersions />}/>
                    </>
                ) : (
                    <>
                        <Route path="auth/*" element={<AlphaAuthRoutes/>} />
                        <Route path='*' element={<AlphaLanding/>}/>
                    </>
                )
            }
        </Routes>
    )
}