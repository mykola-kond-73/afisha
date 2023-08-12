import gql from "graphql-tag";

const types = gql`
    type LoginType{
        user:String!
        refreshToken:String!
        accessToken:String!
    }
`

const inputs = gql`
    input LoginInput{
        email:String!
        password:String!
    }
`

const mutations = gql`
    type Mutation{
        login(input:LoginInput!):LoginType
        logout(refreshToken:String!):Boolean
        refresh(refreshToken:String!):LoginType
    }
`

const authGqlSchema = gql`
    ${types}
    ${inputs}
    ${mutations}
`

export { authGqlSchema }