import React from "react";
import {Route, Routes} from "react-router-dom";
import {ProductDetailPage} from "../sections/product/pages/ProductDetailPage.tsx";
import {SimilarProducts} from "../sections/product/pages/SimilarProducts.tsx";

export const ProductRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={<ProductDetailPage/>}/>
            <Route path="/similar" element={<SimilarProducts/>}></Route>
        </Routes>
    )
}