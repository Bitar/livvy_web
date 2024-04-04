import React from "react";
import {Route, Routes} from "react-router-dom";
import {CelebrityDesignerAll} from "../sections/celebrity-designer/pages/CelebrityDesignerAll.tsx";
import {CelebrityDesignerProfile} from "../sections/celebrity-designer/pages/CelebrityDesignerProfile.tsx";

export const CelebrityDesignerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={<CelebrityDesignerAll/>}></Route>
            <Route path="/:slug" element={<CelebrityDesignerProfile/>}></Route>
        </Routes>
    )
}