import { gql } from '@apollo/client'

export const RECEIVE_PASSWORD_RESET_LINK = gql`
  query EmailPasswordReset($email: String!) {
    requestPasswordChange(email: $email) {
      rejected
      success
    }
  }
`
