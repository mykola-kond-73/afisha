import { gql } from '@apollo/client'

export const REGISTER=gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      name {
        firstname
        lastname
      }
      history
      phone
      reserve
      email
    }
  }
`

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
            }
            film {
              title
              description
              rating
              limitation
            }
            hall{
              _id
            }
          }
          places
          payment_status
          payment_id
          status
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
            }
            film {
              title
              description
              rating
              limitation
            }
            hall{
              _id
            }
          }
          places
          status
        }
        email
        phone
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