import { BaseEntity, Brand, Category, Image, Rating } from '@/shared/model'

export class Product extends BaseEntity {
  name: string
  description?: string
  thumbnail?: string
  price: number
  discount?: number
  stock: number
  screen?: string
  storage?: number
  cpu?: string
  ram?: number
  rating?: Rating[]
  ratingAverage?: number
  brand: Brand
  category: Category
  image?: Image[]
}
