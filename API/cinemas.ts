import { gql } from '@apollo/client'

export const GET_CINEMAS = gql`
    query GetCinemas($offset: Int!, $count: Int!, $filter: FilterCinemaInput!) {
        getCinemas(offset: $offset, count: $count, filter: $filter) {
            cinemas {
                _id
                title
                city
                street
                rating
                createdAt
                updatedAt
            }
            offset
            count
        }
    }
`

export const GET_CINEMA=gql`
    query GetCinema($getCinemaId:ID!){
        getCinema(id:$getCinemaId){
            _id
            title
            city
            street
            rating
            films {
              _id
              title
              description
              rating
              limitation
              createdAt
              updatedAt
            }
            halls {
              _id
              title
              places
              busy
              reserve
              createdAt
              updatedAt
            }
            sessions {
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
            createdAt
            updatedAt
        }
    }
`