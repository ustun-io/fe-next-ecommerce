import { gql } from '@apollo/client'

export const FETCH_PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($paginationArgs: PaginationArgsInput!, $sortArgs: SortArgsInput!, $categoryName: String!) {
    productsByCategory(paginationArgs: $paginationArgs, sortArgs: $sortArgs, categoryName: $categoryName) {
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
