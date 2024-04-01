import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from "../layout/MasterLayout.tsx";
import {Home} from "../sections/home/Home.tsx";
import {Test} from "../Test.tsx";
import {Onboarding} from "../sections/onboarding/pages/Onboarding.tsx";
import {Membership} from "../sections/membership/pages/Membership.tsx";

const PrivateRoutes = () => {

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' index element={<Navigate to={'/onboarding'}/>}/>

                <Route path='/' index element={<Home/>}/>

                <Route path='/onboarding' index element={<Onboarding/>}/>

                <Route path='/membership' index element={<Membership/>}/>

                <Route path='/test' index element={<Test/>}/>

                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

export {PrivateRoutes}
