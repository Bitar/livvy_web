import {AuthModel} from "../models/iam/Auth.tsx";
import {AxiosError, AxiosStatic} from "axios";

const AUTH_LOCAL_STORAGE_KEY = 'livvy-local-configs'

const getAuth = (): AuthModel | undefined => {
    if (!localStorage) {
        return;
    }

    const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)

    if (!lsValue) {
        return;
    }

    try {
        const auth: AuthModel = JSON.parse(lsValue) as AuthModel;

        if (auth) {
            // You can easily check auth_token expiration also
            return auth;
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
}

const setAuth = (auth: AuthModel) => {
    if (!localStorage) {
        return;
    }

    try {
        const lsValue = JSON.stringify(auth);
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
}

const removeAuth = () => {
    if (!localStorage) {
        return;
    }

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
    }
}

export function setupAxios(axios: AxiosStatic) {
    axios.defaults.headers.Accept = 'application/json';

    axios.interceptors.request.use(
        (config: any) => {
            const auth = getAuth();

            if (auth && auth.token) {
                config.headers.Authorization = `Bearer ${auth.token}`;
            }

            return config;
        },
        (err: AxiosError) => Promise.reject(err)
    )
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY};