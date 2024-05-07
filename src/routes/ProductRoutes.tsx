import React from "react";
import {Route, Routes} from "react-router-dom";
import {ProductPage} from "../sections/product/pages/ProductPage.tsx";
import {SimilarProducts} from "../sections/product/pages/SimilarProducts.tsx";

export const ProductRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={<ProductPage/>}/>
            <Route path="/similar" element={<SimilarProducts/>}></Route>
        </Routes>
    )
}