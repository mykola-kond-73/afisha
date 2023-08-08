import gql from "graphql-tag";

const types = gql`
    type NameType{
        firstname:String!
        lastname:String!
    }

    type UserType{
        _id:ID!
        name:NameType!
        history:[OrderForUserType]!
        reserve:[ReserveForUserType]!
        email:String!
        createdAt:String!
        updatedAt:String!
    }

    type CreatedUserType{
        _id:ID!
        name:NameType!
        history:[String]!
        reserve:[String]!
        email:String!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedUserType{
        _id:ID!
        name:NameType!
        updatedAt:String!
        history:[String]!
        reserve:[String]!
    }

    type UsersType{
        users:[UserType]!
        offset:Int!
        count:Int!   
    }

    type UserForOrderReserveTockenType{
        _id:ID!
        name:NameType!
        email:String!
        createdAt:String!
        updatedAt:String!
    }

    type DeleteUserType{
        _id:ID!
        name:NameType!
        history:[String]!
        reserve:[String]!
        email:String!
        createdAt:String!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateNameInput{
        firstname:String!
        lastname:String!
    }

    input UpdateNameInput{
        firstname:String
        lastname:String
    }

    input CreateUserInput{
        name:CreateNameInput!
        email:String!
        password:String!
    }

    input UpdateUserInput{
        name:UpdateNameInput
        history:[String]
        reserve:[String]
    }

    input FilterUserType{
        firstname:String
        lastname:String
        order:String
        reserve:String
        email:String
    }
`

const queries = gql`
    type Query{
        getUsers(offset:Int!,count:Int!,filter:FilterUserType!):UsersType
        getUser(id:ID!):UserType
    }
`

const mutations = gql`
    type Mutation{
        createUser(input:CreateUserInput!):CreatedUserType
        updateUser(id:String!,input:UpdateUserInput!):UpdatedUserType
        deleteUser(id:ID!):DeleteUserType
    }
`

const usersGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { usersGqlSchema }