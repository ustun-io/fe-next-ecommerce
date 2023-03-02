import { IChangePasswordPayload, ILoginPayload, IRegisterPayload, IRequestPasswordChangePayload } from '@shared/dto'

import { RoleEnum } from '@/shared/enum/roles.enum'
import { apolloClient } from '@/shared/service'
import { CHANGE_PASSWORD } from '@/shared/service/auth/graphql/change-password.gql'
import { LOGIN_USER } from '@/shared/service/auth/graphql/login-user.gql'
import { RECEIVE_PASSWORD_RESET_LINK } from '@/shared/service/auth/graphql/receive-password-reset-link.gql'
import { REGISTER_USER } from '@/shared/service/auth/graphql/register-user.gql'
import { VERIFY_TOKEN } from '@/shared/service/auth/graphql/verify-token.gql'

export const signIn = async (signInPayload: ILoginPayload) => {
  const { email, password } = signInPayload
  return await apolloClient.mutate({ mutation: LOGIN_USER, variables: { data: { email, password } } })
}

export const signUp = async (signUpPayload: IRegisterPayload) => {
  const { email, password, phone, role = RoleEnum.CUSTOMER } = signUpPayload
  return await apolloClient.mutate({ mutation: REGISTER_USER, variables: { data: { email, password, phone, role } } })
}

export const signOut = async () => {
  return await apolloClient.resetStore()
}

export const emailPasswordChangeLink = async (requestPasswordChangeEmailPayload: IRequestPasswordChangePayload) => {
  const { email } = requestPasswordChangeEmailPayload
  return await apolloClient.query({ query: RECEIVE_PASSWORD_RESET_LINK, variables: { email } })
}

export const changePassword = async (changePasswordPayload: IChangePasswordPayload) => {
  const { token, password } = changePasswordPayload
  return await apolloClient.mutate({ mutation: CHANGE_PASSWORD, variables: { data: { token, password } } })
}

export const verifyToken = async (token: string, tokenOption: 'password-reset' | 'account-activation') => {
  return await apolloClient.query({ query: VERIFY_TOKEN, variables: { token, tokenOption } })
}
