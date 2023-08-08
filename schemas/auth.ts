import gql from "graphql-tag";

const types = gql`
    type LoginType{
        user_id:String!
        refreshToken:String!
        accessToken:String!
    }
`

const inputs = gql`
    input LoginInput{
        email:String!
        password:String!
    }

    input RefreshInput{
        user_id:String!
        refreshToken:String!
    }
`

const mutations = gql`
    type Mutation{
        login(input:LoginInput):LoginType
        logout(id:String):Boolean
        refresh(input:RefreshInput):LoginType
    }
`

const authGqlSchema = gql`
    ${types}
    ${inputs}
    ${mutations}
`

export { authGqlSchema }