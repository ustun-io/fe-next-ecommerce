import { gql } from '@apollo/client'

export const ADD_RATING = gql`
  mutation AddRating($data: CreateRatingInput!) {
    createRating(data: $data) {
      id
      text
      star
    }
  }
`
