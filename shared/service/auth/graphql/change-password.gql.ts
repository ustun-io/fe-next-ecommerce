import { gql } from '@apollo/client'

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($data: ResetPasswordInput!) {
    changePassword(data: $data) {
      affected
      generatedMaps
      raw
    }
  }
`
