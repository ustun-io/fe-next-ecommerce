import { BaseEntity, Product } from '@/shared/model'

export class Category extends BaseEntity {
  name: string
  product?: Product
}
