import { NextRouter } from 'next/router'

import {
  IChangePasswordPayload,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRequestPasswordChangePayload
} from '@shared/dto'

export interface IAuthStore {
  user: ILoginResponse | null
  accessToken: string | null
  email: string | null
  fetching: boolean
  error: string | null
  signIn: (credentials: ILoginPayload) => Promise<void>
  signUp: (router: NextRouter, credentials: IRegisterPayload) => Promise<void>
  signOut: () => void
  emailPasswordChangeLink: (router: NextRouter, payload: IRequestPasswordChangePayload) => Promise<void>
  changePassword: (router: NextRouter, payload: IChangePasswordPayload) => Promise<void>
  verifyToken: (
    router: NextRouter,
    token: string,
    tokenOption: 'password-reset' | 'account-activation'
  ) => Promise<boolean | undefined>
}
