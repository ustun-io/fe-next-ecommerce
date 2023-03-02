import { IOptionalApiProps } from '@shared/dto'

import { RoleEnum } from '@/shared/enum/roles.enum'

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse extends IOptionalApiProps {
  accessToken: string
  user: object
}

export interface IRegisterPayload {
  email: string
  password: string
  role?: RoleEnum
  phone?: string
}

export interface IRegisterResponse extends IOptionalApiProps {
  success: boolean
}

export interface IRequestPasswordChangePayload {
  email: string
}

export interface IRequestPasswordChangeResponse extends IOptionalApiProps {
  success: boolean
  rejected: [] | boolean
}

export interface IChangePasswordPayload {
  token: string
  password: string
}

export interface IChangePasswordResponse extends IOptionalApiProps {
  generatedMaps: []
  raw: []
  affected: number
}

export interface IVerifyToken extends IOptionalApiProps {
  success: boolean
}
