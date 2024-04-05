import {Route, Routes} from "react-router-dom";
import {AddInspiration} from "../sections/inspiration/pages/AddInspiration.tsx";

export const InspirationRoutes = () => {
    return (
        <Routes>
            <Route index element={<AddInspiration />}></Route>
        </Routes>
    )
}