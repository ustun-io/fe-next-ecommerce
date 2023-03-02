import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation Register($data: CreateUserInput!) {
    signUp(data: $data) {
      message
      success
    }
  }
`
