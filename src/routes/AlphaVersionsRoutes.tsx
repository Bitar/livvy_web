import React from "react";
import {Route, Routes} from "react-router-dom";
import {AlphaVersions} from "../sections/beta-testers/pages/AlphaVersions.tsx";
import {AlphaVersionsView} from "../sections/beta-testers/pages/AlphaVersionsView.tsx";
import {AlphaVersionsLayout} from "../sections/beta-testers/pages/AlphaVersionsLayout.tsx";

export const AlphaVersionsRoutes = () => {
    return (
        <Routes>
            <Route element={<AlphaVersionsLayout/>}>
                <Route index element={<AlphaVersions/>}></Route>
                <Route path='/:slug/*' element={<AlphaVersionsView/>}/>
            </Route>
        </Routes>
    )
}