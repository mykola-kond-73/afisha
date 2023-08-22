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
                photo
            }
            offset
            count
            totalCount
        }
    }
`

export const GET_CINEMA = gql`
    query GetCinema($getCinemaId:ID!){
        getCinema(id:$getCinemaId){
            _id
            title
            city
            street
            rating
            photo
            films {
              _id
              title
              description
              rating
              photo
              limitation
            }
            halls {
              _id
              title
              places
              busy
              reserve
            }
            sessions {
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
        }
    }
`