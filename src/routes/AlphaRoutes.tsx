import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {AlphaAuthRoutes} from "./AlphaAuthRoutes.tsx";
import {AlphaLanding} from "../sections/beta-testers/pages/AlphaLanding.tsx";
import {AlphaVersionsRoutes} from "./AlphaVersionsRoutes.tsx";
import {useAuth} from "../sections/auth/core/Auth.loader.ts";

export const AlphaRoutes = () => {
    const {currentUser} = useAuth()

    return (
        <Routes>
            {
                currentUser ? (
                    <>
                        <Route path='auth/*' element={<Navigate to={'/alpha/'}/>}/>
                        <Route path='/*' element={<AlphaVersionsRoutes />}/>
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