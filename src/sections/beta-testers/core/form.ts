import * as Yup from "yup";
import {UserSourceEnum} from "../../../enums/UserSourceEnum.ts";

// Register
export const BetaRegisterSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email().min(3, 'minimum 3 characters').max(50, 'maximum 50 characters').required(),
    password: Yup.string().min(3, 'minimum 3 characters').max(50, 'maximum 50 characters').required(),
    password_confirmation: Yup.string().required('confirm the password').oneOf([Yup.ref('password')], 'Passwords do not match.')
})

export interface BetaRegisterFormFields {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirmation: string,
    source: string
}

export const defaultBetaRegisterFormFields: BetaRegisterFormFields = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    source: UserSourceEnum.REGISTRATION
}


// Login
export const BetaLoginSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'minimum 3 characters').max(50, 'maximum 50 characters').required(),
    password: Yup.string().min(3, 'minimum 3 characters').max(50, 'maximum 50 characters').required()
})

export interface BetaLoginFormFields {
    email: string,
    password: string
}

export const defaultBetaLoginFormFields: BetaLoginFormFields = {
    email: '',
    password: ''
}