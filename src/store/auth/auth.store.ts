import { NextRouter } from 'next/router'

import { changePassword, emailPasswordChangeLink, signIn, signOut, signUp, verifyToken } from '@/shared/service'

import { IChangePasswordPayload, ILoginPayload, IRegisterPayload, IRequestPasswordChangePayload } from '@shared/dto'
import { formatError, navigateTo } from '@shared/util'
import { IAuthStore } from '@store/auth/auth.dto'
import { initialState } from '@store/auth/auth.inital'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const useAuthStore = create(
  devtools(
    persist<IAuthStore>(
      (set) => ({
        ...initialState,
        signIn: async (credentials: ILoginPayload) => {
          set((state: IAuthStore) => ({ ...state, error: null }))
          try {
            set((state: IAuthStore) => ({ ...state, fetching: true }))
            const { data } = await signIn(credentials)
            set((state: IAuthStore) => ({
              ...state,
              user: data.signIn.user,
              email: data.signIn.user.email,
              accessToken: data.signIn.accessToken,
              fetching: false,
              error: null
            }))
          } catch (e: any) {
            const error = formatError(e)
            set((state: IAuthStore) => ({ ...state, fetching: false, error }))
          }
        },
        signUp: async (router: NextRouter, credentials: IRegisterPayload) => {
          try {
            set((state: IAuthStore) => ({ ...state, fetching: true }))
            const { data } = await signUp(credentials)
            set((state: IAuthStore) => ({ ...state, fetching: false }))
            if (data?.signUp.success) {
              set((state: IAuthStore) => ({ ...state, error: null }))
              navigateTo(router, '/auth?opt=login')
            }
          } catch (error: any) {
            set((state: IAuthStore) => ({ ...state, fetching: false, error: error.message }))
          }
        },
        signOut: async () => {
          await signOut()
          set(() => initialState)
          sessionStorage?.clear()
        },
        emailPasswordChangeLink: async (router: NextRouter, payload: IRequestPasswordChangePayload) => {
          try {
            const { email } = payload
            set((state: IAuthStore) => ({ ...state, fetching: true }))
            const { data } = await emailPasswordChangeLink({ email })
            set((state) => ({ ...state, fetching: false }))
            if (data?.requestPasswordChange.success) {
              set((state) => ({ ...state, email }))
              navigateTo(router, '/auth/reset-password/email-sent')
            }
          } catch (error: any) {
            set((state: IAuthStore) => ({ ...state, fetching: false, error: error.message }))
          }
        },
        changePassword: async (router: NextRouter, payload: IChangePasswordPayload) => {
          try {
            set((state: IAuthStore) => ({ ...state, fetching: true }))
            const { data } = await changePassword(payload)
            set((state) => ({ ...state, fetching: false }))
            if (data?.changePassword.affected === 1) {
              navigateTo(router, '/auth/sign-in?passwordChanged=true')
            }
          } catch (error: any) {
            set((state: IAuthStore) => ({ ...state, fetching: false, error: error.message }))
          }
        },
        verifyToken: async (
          router: NextRouter,
          token: string,
          tokenOption: 'password-reset' | 'account-activation'
        ) => {
          try {
            set((state: IAuthStore) => ({ ...state, fetching: true }))
            const { data } = await verifyToken(token, tokenOption)
            if (data?.verifyToken.success === true) {
              set((state: IAuthStore) => ({ ...state, fetching: false }))
              return true
            } else if (!data?.verifyToken.success) {
              set((state: IAuthStore) => ({ ...state, fetching: false, error: data?.message }))
              navigateTo(router, '/auth/sign-in?tokenInvalid=true')
              return false
            }
            set((state: IAuthStore) => ({ ...state, fetching: false }))
          } catch (error: any) {
            set((state: IAuthStore) => ({ ...state, fetching: false, error: error.message }))
          }
        }
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export const useAuthenticated = () =>
  useAuthStore((state): boolean => {
    return !!state.accessToken
  })

export default useAuthStore
