import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        user
        refreshToken
        accessToken
      }
    }
`

export const LOGOUT = gql`
    mutation Logout($refreshToken:String!) {
        logout(refreshToken: $refreshToken)
    }
`

export const refreshJson = (refreshTocken: string) => {
  const query = JSON.stringify({
    query: `mutation{
      refresh(refreshToken:"${refreshTocken}") {
        user
        refreshToken
        accessToken
      }
  }
  `
  })
  return query
}