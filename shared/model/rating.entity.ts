import { BaseEntity, Product, User } from '@/shared/model'

export class Rating extends BaseEntity {
  text: string
  rating: number
  product: Product
  user: User
}
