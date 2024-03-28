import * as Yup from 'yup';

// ---------------------------------------------------------------------------------------------------------------------
// Login Form
// ---------------------------------------------------------------------------------------------------------------------

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required(),
    password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required()
})

export interface LoginFormFields {
    email: string,
    password: string
}

export const defaultLoginFormFields: LoginFormFields = {
    email: '',
    password: ''
}

// ---------------------------------------------------------------------------------------------------------------------
// Register Form
// ---------------------------------------------------------------------------------------------------------------------
export const RegisterSchema = Yup.object().shape({
    full_name: Yup.string().required(),
    email: Yup.string().email().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required(),
    password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required(),
    password_confirmation: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match.')
})

export interface RegisterFormFields {
    full_name: string,
    email: string,
    password: string,
    password_confirmation: string
}

export const defaultRegisterFormFields: RegisterFormFields = {
    full_name: '',
    email: '',
    password: '',
    password_confirmation: ''
}