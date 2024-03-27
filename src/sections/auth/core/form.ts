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
    email: Yup.string().email().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required(),
    password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required()
})

// export const resetPasswordSchema = Yup.object().shape({
//     email: Yup.string().email().min(3, 'The email must be at least 3 characters.').max(50, 'The email must be at most 50 characters.').required(),
//     password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
//     password_confirmation: Yup.string().required().oneOf([Yup.ref('password')], 'Passwords do not match.'),
// })