import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {setupAxios} from "./helpers/auth.ts";
import {AuthProvider} from "./sections/auth/core/Auth.tsx";
import {AppRoutes} from "./routes/AppRoutes.tsx";
import './index.scss'

setupAxios(axios)

const container = document.getElementById('root')
if (container) {
    createRoot(container).render(
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}
