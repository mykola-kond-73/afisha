import { gql } from '@apollo/client'

export const CREATE_ORDER=gql`
    mutation CreateOrder($input: CreateOrderInput!) {
      createOrder(input: $input) {
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
        payment_status
        payment_id
        status
      }
    }
`

export const CANCEL_ORDER=gql`
    mutation CancelOrder($cancelOrderId: String!) {
        cancelOrder(id: $cancelOrderId) {
            _id
            status
            updatedAt
            places
        }
    }
`