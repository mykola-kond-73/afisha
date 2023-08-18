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
        payment_status
        payment_id
        status
        createdAt
        updatedAt
      }
    }
`

export const UPDATE_ORDER=gql`
    mutation UpdateOrder($updateOrderId: String!, $input: UpdateOrderInput!) {
        updateOrder(id: $updateOrderId, input: $input) {
            _id
            places
            updatedAt
        }
    }
`

export const CANCEL_ORDER=gql`
    mutation CancelOrder($cancelOrderId: String!) {
        cancelOrder(id: $cancelOrderId) {
            _id
            status
            updatedAt
        }
    }
`

