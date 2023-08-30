import { gql } from '@apollo/client'

export const READ_CAHCHE_USER=gql`
  query ReadUser($id:ID!){
    getUser(id:$id){
      reserve{
        _id
        places
        session
        status
      }
    }
  }
`

export const UPDATE_HISTORY_USER_DATA = gql`
    fragment UpdateHistoryUserData on UserType{
        history{
            _id
            payment_id
            payment_status
            places
            session
            status
        }
    }
`

export const UPDATE_ORDER_STATUS=gql`
    fragment UpdateOrderStatus on OrderForUserType{
        status
    }
`

export const UPDATE_HALL_ORDER=gql`
    fragment UpdateHallOrder on HallType{
        busy
    }
`

export const UPDATE_RESERVE_STATUS=gql`
    fragment UpdateReserveStatus on ReserveForUserType{
        status
    }
`

export const UPDATE_HALL_RESERVE=gql`
    fragment UpdateHallReserve on HallType{
        reserve
}
`