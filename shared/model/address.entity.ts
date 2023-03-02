import { AddressType } from '@/shared/enum/address-type.enum'
import { Country } from '@/shared/enum/country-iso3166.enum'
import { BaseEntity, User } from '@/shared/model'

export class Address extends BaseEntity {
  firstName: string
  lastName: string
  companyName?: string
  line1: string
  zipCode: string
  state: string
  phone?: string
  countryCode: Country
  primary?: boolean
  type: AddressType
  user: User
}
