import {Route, Routes} from 'react-router-dom'
import {Login} from "../sections/auth/pages/Login.tsx";
import {AuthLayout} from "../layout/AuthLayout.tsx";
import {Register} from "../sections/auth/pages/Register.tsx";
import {ResetPassword} from "../sections/auth/pages/ResetPassword.tsx";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='reset-password' element={<ResetPassword/>}/>
                {/*<Route path='forgot-password' element={<ForgotPassword/>}/>*/}
                {/*<Route path='reset-password' element={<ResetPassword/>}/>*/}
                <Route index element={<></>}/>
            </Route>
        </Routes>
    )
}

export {AuthRoutes}
