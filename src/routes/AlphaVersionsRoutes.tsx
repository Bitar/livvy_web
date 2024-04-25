import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../sections/auth/core/Auth.tsx";
import {AlphaAuthRoutes} from "./AlphaAuthRoutes.tsx";
import {AlphaVersions} from "../sections/beta-testers/pages/AlphaVersions.tsx";
import {AlphaLanding} from "../sections/beta-testers/pages/AlphaLanding.tsx";
import {AlphaVersionsView} from "../sections/beta-testers/pages/AlphaVersionsView.tsx";
import {AlphaVersionsLayout} from "../sections/beta-testers/pages/AlphaVersionsLayout.tsx";

export const AlphaVersionsRoutes = () => {
    const {currentUser} = useAuth()

    return (
        <Routes>
            <Route element={<AlphaVersionsLayout/>}>
                <Route index element={<AlphaVersions/>}></Route>
                <Route path='/:slug/*' element={<AlphaVersionsView/>}/>
            </Route>
        </Routes>
    )
}