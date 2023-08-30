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
          }
          film {
            _id
            title
            description
            rating
            limitation
          }
          hall {
            _id
            title
            places
            busy
            reserve
          }
        }
        places
        status
      }
    }
`

export const CANCEL_RESERVE=gql`
    mutation CancelReserve($cancelReserveId: String!) {
        cancelReserve(id: $cancelReserveId) {
            _id
            status
            updatedAt
            places
        }
    }
`