import { Address, BaseEntity, Rating } from '@/shared/model'

import { Property } from 'csstype'
import Order = Property.Order
import { RoleEnum } from '@/shared/enum/roles.enum'

export class User extends BaseEntity {
  email: string
  password: string
  role?: RoleEnum
  phone?: string
  activatedAt?: Date
  activateAccountToken?: string
  resetPasswordToken?: string
  address?: Address[]
  order?: Order[]
  rating?: Rating[]
}
