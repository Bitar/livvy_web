import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {setupAxios} from "./helpers/auth.ts";
import {AppRoutes} from "./routes/AppRoutes.tsx";
import './index.scss'
import {AuthProvider} from "./sections/auth/core/Auth.tsx";


setupAxios(axios)

const container = document.getElementById('root')
if (container) {
    createRoot(container).render(
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    )
}
