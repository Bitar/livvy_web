import {Route, Routes} from "react-router-dom";
import {AddInspiration} from "../sections/inspiration/pages/AddInspiration.tsx";
import {InspirationLoading} from "../sections/inspiration/pages/InspirationLoading.tsx";
import {BrowseLibrary} from "../sections/inspiration/pages/BrowseLibrary.tsx";

export const InspirationRoutes = () => {
    return (
        <Routes>
            <Route index element={<AddInspiration/>}/>

            <Route path={'/loading'} element={<InspirationLoading/>}/>

            <Route path={'/browse'} element={<BrowseLibrary/>}/>
        </Routes>
    )
}