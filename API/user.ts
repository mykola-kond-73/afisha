import { gql } from '@apollo/client'

export const GET_USER=gql`
    query Query($getUserId: ID!) {
      getUser(id: $getUserId) {
        _id
        name {
          firstname
          lastname
        }
        history {
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
        reserve {
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
        email
        phone
        createdAt
        updatedAt
      }
    }
`

export const UPDATE_USER=gql`
    mutation UpdateUser($updateUserId: String!, $input: UpdateUserInput!) {
        updateUser(id: $updateUserId, input: $input) {
            _id
            name {
                firstname
                lastname
            }
            updatedAt
        }
    }
`

export const DELETE_USER=gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
    }
  }
`