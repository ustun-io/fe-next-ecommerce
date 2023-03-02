import { gql } from '@apollo/client'

export const FETCH_PRODUCTS_BY_BRAND = gql`
  query ProductsByBrand($paginationArgs: PaginationArgsInput!, $sortArgs: SortArgsInput!, $brandName: String!) {
    productsByBrand(paginationArgs: $paginationArgs, sortArgs: $sortArgs, brandName: $brandName) {
      count
      data {
        id
        name
        brand {
          name
        }
        category {
          name
        }
        thumbnail
        price
        discount
        stock
        ratingAverage
        cpu
        ram
        screen
        storage
      }
    }
  }
`
