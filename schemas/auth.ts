import gql from "graphql-tag";

const types = gql`
    type CinemaType{
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
        login(input:LoginInput):CinemaType
        logout(id:String):Boolean
        refresh(input:RefreshInput):CinemaType
    }
`

const authGqlSchema = gql`
    ${types}
    ${inputs}
    ${mutations}
`

export { authGqlSchema }