import { PaginationArgs } from '@/shared/model/pagination-args.entity'
import { SortArgs } from '@/shared/model/sort-args.model'
import { CreateRatingInput } from '@/shared/service/product/dto/create-rating.input'
import { FilterArgs } from '@/shared/service/product/dto/filter.args'
import FetchBrands from '@/shared/service/product/graphql/brand/fetch-brands.graphql'
import FetchCategories from '@/shared/service/product/graphql/category/fetch-categories.graphql'
import FetchProduct from '@/shared/service/product/graphql/product/fetch-product.graphql'
import FetchProducts from '@/shared/service/product/graphql/product/fetch-products.graphql'
import FetchRam from '@/shared/service/product/graphql/product/fetch-ram.graphql'
import FetchStorage from '@/shared/service/product/graphql/product/fetch-storage.graphql'
import SearchProducts from '@/shared/service/product/graphql/product/search-products.graphql'
import AddRating from '@/shared/service/product/graphql/rating/add-rating.graphql'

import { apolloClient } from '@shared/service'

export const products = async (paginationArgs: PaginationArgs, sortArgs: SortArgs, filterArgs?: FilterArgs) => {
  return await apolloClient
    .query({
      query: FetchProducts,
      variables: {
        paginationArgs,
        sortArgs,
        filterArgs
      }
    })
    .then((response) => response.data.products)
}

export const product = async (id: string) => {
  return await apolloClient.query({ query: FetchProduct, variables: { id } })
}

export const searchProducts = async (paginationArgs: PaginationArgs, q: string, sortArgs: SortArgs) => {
  const { page, limit } = paginationArgs
  const { sortDir, sortBy } = sortArgs
  return await apolloClient.query({
    query: SearchProducts,
    variables: {
      paginationArgs: {
        page,
        limit
      },
      search: q,
      sortArgs: {
        sortDir,
        sortBy
      }
    }
  })
}

export const brands = async () => {
  return await apolloClient.query({
    query: FetchBrands
  })
}

export const categories = async () => {
  return await apolloClient.query({
    query: FetchCategories
  })
}

export const addRating = async (ratingInput: CreateRatingInput) => {
  const { productId, rating, text } = ratingInput
  return await apolloClient.mutate({ mutation: AddRating, variables: { data: { productId, rating, text } } })
}

export const fetchRam = async () => {
  return await apolloClient.query({
    query: FetchRam
  })
}

export const fetchStorage = async () => {
  return await apolloClient.query({
    query: FetchStorage
  })
}
