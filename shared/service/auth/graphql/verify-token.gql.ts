import { gql } from '@apollo/client'

export const VERIFY_TOKEN = gql`
  query Verify($token: String!, $tokenOption: String!) {
    verifyToken(token: $token, tokenOption: $tokenOption) {
      valid
    }
  }
`
