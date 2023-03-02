import * as Yup from 'yup'

export const FORM_SIGN_UP = 'form-sign-up'
export const FORM_SIGN_IN = 'form-sign-in'
export const FORM_PASSWORD_RESET = 'form-password-reset'

export const SIGN_IN = 'Sign in'
export const LOGIN = 'Login'
export const SIGN_UP = 'Sign up'
export const FORGOT_PASSWORD = 'Forgot password?'
export const ALREADY_HAS_ACCOUNT = 'Already have an account? Sign in.'
export const NO_ACCOUNT_YET = "Don't have an account yet? Sign up."
export const RESET_YOUR_PASSWORD = 'Reset your password'
export const RESET_PASSWORD_SUBMIT = 'Receive reset link'
export const RESET_PASSWORD_SUCCESS = (email: string) =>
  `A password reset url has been sent to ${email}. Please check your inbox or spam folder.`
export const NEW_PASSWORD = 'Please choose a new password'
export const RESET_PASSWORD = 'Reset password'

export const TOKEN_INVALID = 'Token invalid. Please request a new password reset.'
export const PASSWORD_CHANGED = 'Password changed successfully. Please login with your new credentials.'

export const VALIDATION_EMAIL = {
  email: Yup.string().email('E-Mail must be valid.').required('An E-mail is required')
}

export const VALIDATION_PASSWORD = {
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password requires a minimum of 6 characters')
    .max(96, "Password can't contain more than 96 characters")
}

export const VALIDATION_PASSWORD_REPEAT = {
  passwordConfirm: Yup.string()
    .required('Repeated password is required')
    .min(6, 'Password requires a minimum of 6 characters')
    .max(96, "Password can't contain more than 96 characters")
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
}
