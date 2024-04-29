import axios, {AxiosError} from 'axios'
import {AuthModel} from "../../models/iam/Auth.tsx";
import {createFormData} from "../../helpers/requests.ts";
import {user} from "../../data/user.ts";
import {User} from "../../models/iam/User.ts";
import {BetaLoginFormFields, BetaRegisterFormFields} from "../../sections/beta-testers/core/form.ts";
import {ResetPasswordFormFields} from "../../sections/auth/core/form.ts";

const API_URL = import.meta.env.VITE_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const GET_USER_PROFILE = `${API_URL}/iam/profile`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const BETA_REGISTER_URL = `${API_URL}/beta/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`
export const RESET_PASSWORD_URL = `${API_URL}/reset_password`
export const VERIFY_ACCOUNT_URL = `${API_URL}/email/verify`
export const RESEND_VERIFICATION_URL = `${API_URL}/email/verification-notification`

// Server should return AuthModel
export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email,
        password,
    })
}

// Server should return AuthModel

// TODO: Remove eslint-disable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function register(email: string, firstname: string, lastname: string, password: string, password_confirmation: string) {
    return {
        data: user
    }
    // return axios.post(REGISTER_URL, {
    //     email,
    //     first_name: firstname,
    //     last_name: lastname,
    //     password,
    //     password_confirmation,
    // })
}

export const betaRegister = async (form: BetaRegisterFormFields): Promise<void | AxiosError | undefined> => {
    const formData = createFormData(form);

    return await axios.post(BETA_REGISTER_URL, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

// TODO: Remove eslint-disable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const requestPassword = async (form: ResetPasswordFormFields): Promise<string | AxiosError | undefined> => {
    // const formData = createFormData(form);

    return 'OK';
    // return await axios.post(REQUEST_PASSWORD_URL, formData)
    //     .then(res => res.data)
    //     .catch((error) => {
    //         error = error as AxiosError;
    //
    //         return error;
    //     });
}

export const resetPassword = async (form: any): Promise<string | AxiosError | undefined> => {
    const formData = createFormData(form);

    return await axios.post(RESET_PASSWORD_URL, formData)
        .then(res => res.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export const verifyAccount = async (email: string, token: string): Promise<string | AxiosError | undefined> => {
    return await axios.get(`${VERIFY_ACCOUNT_URL}?email=${email}&token=${token}`)
        .then(res => res.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}

export function getUserByToken(token: string) {
    return axios.get<User>(GET_USER_PROFILE, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        transformResponse: [
            function (data) {
                return JSON.parse(data).data
            },
        ],
    })
}

export const resendAccountActivationEmail = async (form: BetaLoginFormFields|BetaRegisterFormFields): Promise<void | AxiosError | undefined> => {
    const formData = createFormData(form);

    return await axios.post(RESEND_VERIFICATION_URL, formData)
        .then(res => res.data)
        .catch((error) => {
            error = error as AxiosError;

            return error;
        });
}