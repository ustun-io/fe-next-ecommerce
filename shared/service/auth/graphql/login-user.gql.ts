import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation Login($data: LoginUserInput!) {
    signIn(data: $data) {
      accessToken
      user {
        id
        email
        phone
        role
      }
    }
  }
`
