import gql from "graphql-tag";

const types = gql`
    type ReserveType{
        _id:ID!
        user:UserType!
        sessions:SessionType!
        count:Int!
        status:OrderReserveStatus!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedReserveType{
        _id:ID!
        count:Int!
        status:OrderReserveStatus!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateReserveInput{
        user:String!
        sessions:String!
        count:Int!
        status:OrderReserveStatus!
    }

    input UpdateReserveInput{
        count:Int!
        status:OrderReserveStatus!
    }
`

const queries = gql`
    type Query{
        getReserves(offset:Int!,count:Int!):[ReserveType]
        getReserve(id:ID!):ReserveType
    }
`

const mutations = gql`
    type Mutation{
        createReserve(input:CreateReserveInput!):ReserveType
        updateReserve(input:UpdateReserveInput!):UpdatedReserveType
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