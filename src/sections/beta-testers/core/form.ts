import * as Yup from "yup";
import {UserSourceEnum} from "../../../enums/UserSourceEnum.ts";

// Register
export const BetaRegisterSchema = Yup.object().shape({
    full_name: Yup.string().required(),
    email: Yup.string().email().min(3, 'minimum 6 characters').max(50, 'maximum 50 characters').required(),
    password: Yup.string().min(3, 'minimum 6 characters').max(50, 'maximum 50 characters').required()
})

export interface BetaRegisterFormFields {
    full_name: string
    email: string,
    password: string,
    source: string
}

export const defaultBetaRegisterFormFields: BetaRegisterFormFields = {
    full_name: '',
    email: '',
    password: '',
    source: UserSourceEnum.REGISTRATION
}


// Login
export const BetaLoginSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'minimum 6 characters').max(50, 'maximum 50 characters').required(),
    password: Yup.string().min(3, 'minimum 6 characters').max(50, 'maximum 50 characters').required()
})

export interface BetaLoginFormFields {
    email: string,
    password: string
}

export const defaultBetaLoginFormFields: BetaLoginFormFields = {
    email: '',
    password: ''
}