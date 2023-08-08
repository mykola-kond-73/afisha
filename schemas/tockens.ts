import gql from "graphql-tag";

const types = gql`
    type TockenType{
        _id:ID!
        user:UserForOrderReserveTockenType!
        refreshToken:String!
        createdAt:String!
        updatedAt:String!
    }

    type DeletedTockenType{
        _id:ID!
        user:String!
        refreshToken:String!
        createdAt:String!
        updatedAt:String!
    }

    type TockensType{
        tockens:[TockenType]!
        offset:Int!
        count:Int!
    }
`
const inputs = gql`
    input FilterTockenInput{
        user:String
    }
`

const queries = gql`
    type Query{
        getTockens(offset:Int!,count:Int!,filter:FilterTockenInput!):TockensType
    }
`

const mutations = gql`
    type Mutation{
        deleteTocken(id:ID!):DeletedTockenType
    }
`

const tockensGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { tockensGqlSchema }