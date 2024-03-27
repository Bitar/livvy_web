import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from "../layout/MasterLayout.tsx";
import {Home} from "../pages/Home.tsx";
import {Test} from "../Test.tsx";

const PrivateRoutes = () => {

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='/' index element={<Home/>}/>

                <Route path='/test' index element={<Test/>}/>

                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

export {PrivateRoutes}
