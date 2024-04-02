import React from "react";
import {Route, Routes} from "react-router-dom";
import {CelebrityDesignerAll} from "../sections/celebrity-designer/pages/CelebrityDesignerAll.tsx";
import {CelebrityDesignerSingle} from "../sections/celebrity-designer/pages/CelebrityDesignerSingle.tsx";

export const CelebrityDesignerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={<CelebrityDesignerAll/>}></Route>
            <Route path="/:slug" element={<CelebrityDesignerSingle/>}></Route>
        </Routes>
    )
}