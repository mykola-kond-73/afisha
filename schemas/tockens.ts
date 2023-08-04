import gql from "graphql-tag";

const types = gql`
    type TockenType{
        _id:ID!
        user:String!
        refreshToken:String!
        createdAt:String!
        updatedAt:String!
    }
`

const queries = gql`
    type Query{
        getTockens(offset:Int!,count:Int!):[TockenType]
    }
`

const mutations = gql`
    type Mutation{
        deleteTocken(id:ID!):TockenType
    }
`

const tockensGqlSchema = gql`
    ${types}
    ${queries}
    ${mutations}
`

export { tockensGqlSchema }