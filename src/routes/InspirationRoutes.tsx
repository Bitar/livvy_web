import {Route, Routes} from "react-router-dom";
import {AddInspiration} from "../sections/inspiration/pages/AddInspiration.tsx";
import {InspirationLoading} from "../sections/inspiration/pages/InspirationLoading.tsx";

export const InspirationRoutes = () => {
    return (
        <Routes>
            <Route index element={<AddInspiration/>}/>

            <Route path={'/loading'} element={<InspirationLoading/>}/>
        </Routes>
    )
}