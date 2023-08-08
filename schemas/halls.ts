import gql from "graphql-tag";

const types = gql`
    type HallType{
        _id:ID!
        title:String!
        places:Int!
        busy:[Int]!
        reserve:[Int]!
        createdAt:String!
        updatedAt:String!
    }

    type HallsType{
        halls:[HallType]!
        offset:Int!
        count:Int!
    }

    type UpdatedHallType{
        _id:ID!
        title:String!
        places:Int!
        busy:[Int]!
        reserve:[Int]!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateHallInput{
        title:String!
        places:Int!
    }

    input UpdateHallInput{
        title:String
        places:Int
        busy:[Int]
        reserve:[Int]
    }

    input FilterHallInput{
        title:String
        places:String
    }
`

const queries = gql`
    type Query{
        getHalls(offset:Int!,count:Int!,filter:FilterHallInput!):HallsType
        getHall(id:ID!):HallType
    }
`

const mutations = gql`
    type Mutation{
        createHall(input:CreateHallInput!):HallType
        updateHall(id:String!,input:UpdateHallInput!):UpdatedHallType
        deleteHall(id:ID!):HallType
    }
`

const hallsGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export {hallsGqlSchema}