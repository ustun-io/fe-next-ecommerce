import { BaseEntity, Product } from '@/shared/model'

export class Image extends BaseEntity {
  url: string
  product?: Product
}
