import React from "react";
import {Route, Routes} from "react-router-dom";
import {ProductDetailPage} from "../sections/product/pages/ProductDetailPage.tsx";

export const ProductRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={<ProductDetailPage/>}/>
            {/*<Route path="/:slug" element={<CelebrityDesignerProfile/>}></Route>*/}
        </Routes>
    )
}