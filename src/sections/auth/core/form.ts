import * as Yup from 'yup';

// ---------------------------------------------------------------------------------------------------------------------
// Login Form
// ---------------------------------------------------------------------------------------------------------------------

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'minimum 6 characters').max(50, 'maximum 50 characters').required(),
    password: Yup.string().min(3, 'minimum 6 characters').max(50, 'maximum 50 characters').required()
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
    email: Yup.string().email().min(3, 'Minimum 6 symbols').max(50, 'Maximum 50 symbols').required(),
    password: Yup.string().min(3, 'Minimum 6 symbols').max(50, 'Maximum 50 symbols').required()
})

export interface RegisterFormFields {
    full_name: string,
    email: string,
    password: string
}

export const defaultRegisterFormFields: RegisterFormFields = {
    full_name: '',
    email: '',
    password: ''
}

// ---------------------------------------------------------------------------------------------------------------------
// Reset Password Form
// ---------------------------------------------------------------------------------------------------------------------
export const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email().min(3, 'Minimum 6 symbols').max(50, 'Maximum 50 symbols').required(),
    password: Yup.string().min(3, 'Minimum 6 symbols').max(50, 'Maximum 50 symbols').required(),
    password_confirmation: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match.')
});

export interface ResetPasswordFormFields {
    email: string,
    password: string,
    password_confirmation: string
}

export const defaultResetPasswordFields: ResetPasswordFormFields = {
    email: '',
    password: '',
    password_confirmation: ''
}