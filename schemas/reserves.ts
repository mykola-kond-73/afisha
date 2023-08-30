import gql from "graphql-tag";

const types = gql`
    type ReserveType{
        _id:ID!
        user:UserForOrderReserveTockenType!
        session:SessionType!
        places:[Int!]!
        status:OrderReserveStatus!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedReserveType{
        _id:ID!
        places:[Int!]!
        updatedAt:String!
    }
    
    type ReservesType{
        reserves:[ReserveType]!
        offset:Int!
        count:Int!
    }

    type CanceledReserveType{
        _id:ID
        status:OrderReserveStatus
        updatedAt:String
        places:[Int!]
    }

    type ReserveForUserType{
        _id:ID!
        session:SessionType!
        places:[Int!]!
        status:OrderReserveStatus!
        createdAt:String!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateReserveInput{
        user:String!
        session:String!
        places:[Int!]!
    }

    input UpdateReserveInput{
        places:[Int!]
    }

    input FilterReserveInput{
        user:String
        session:String
        place:Int
        status:OrderReserveStatus
    }
`

const queries = gql`
    type Query{
        getReserves(offset:Int!,count:Int!,filter:FilterReserveInput!):ReservesType
        getReserve(id:ID!):ReserveType
    }
`

const mutations = gql`
    type Mutation{
        createReserve(input:CreateReserveInput!):ReserveType
        updateReserve(id:String!,input:UpdateReserveInput!):UpdatedReserveType
        cancelReserve(id:String!):CanceledReserveType
        deleteReserve(id:ID!):ReserveType
    }
`

const reservesGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { reservesGqlSchema }