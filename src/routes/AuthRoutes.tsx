import {Route, Routes} from 'react-router-dom'
import {Login} from "../sections/auth/pages/Login.tsx";
import {AuthLayout} from "../layout/AuthLayout.tsx";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path='login' element={<Login/>}/>
                {/*<Route path='forgot-password' element={<ForgotPassword/>}/>*/}
                {/*<Route path='reset-password' element={<ResetPassword/>}/>*/}
                <Route index element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export {AuthRoutes}
