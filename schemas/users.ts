import gql from "graphql-tag";

const types = gql`
    type NameType{
        firstname:String!
        lastName:String!
    }

    type UserType{
        _id:ID!
        name:NameType!
        history:[OrderType]!
        reserve:[ReserveType]!
        email:String!
        password:String!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedUserType{
        _id:ID!
        name:NameType!
        updatedAt:String!
    }
`

const inputs = gql`
    input NameInput{
        firstname:String!
        lastName:String!
    }

    input CreateUserInput{
        name:NameInput!
        email:String!
        password:String!
    }

    input UpdateUserInput{
        name:NameInput!
    }
`

const queries = gql`
    type Query{
        getUsers(offset:Int!,count:Int!):[UserType]
        getUser(id:ID!):UserType
    }
`

const mutations = gql`
    type Mutation{
        createUser(input:CreateUserInput!):UserType
        updateUser(input:UpdateUserInput!):UpdatedUserType
        deleteUser(id:ID!):UserType
    }
`

const usersGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { usersGqlSchema }