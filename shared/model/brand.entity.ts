import { BaseEntity, Product } from '@/shared/model'

export class Brand extends BaseEntity {
  name: string
  product?: Product
}
