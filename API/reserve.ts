import { gql } from '@apollo/client'

export const CREATE_RESERVE=gql`
    mutation CreateReserve($input: CreateReserveInput!) {
      createReserve(input: $input) {
        _id
        session {
          _id
          timeline
          date
          ticket {
            _id
            cost
            createdAt
            updatedAt
          }
          film {
            _id
            title
            description
            rating
            limitation
            createdAt
            updatedAt
          }
          hall {
            _id
            title
            places
            busy
            reserve
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        places
        status
        createdAt
        updatedAt
      }
    }
`

export const UPDATE_RESERVE=gql`
    mutation UpdateReserve($updateReserveId: String!, $input: UpdateReserveInput!) {
        updateReserve(id: $updateReserveId, input: $input) {
            _id
            places
            updatedAt
        }
    }
`
export const CANCEL_RESERVE=gql`
    mutation CancelReserve($cancelReserveId: String!) {
        cancelReserve(id: $cancelReserveId) {
            _id
            status
            updatedAt
        }
    }
`