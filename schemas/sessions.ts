import gql from "graphql-tag";

const types = gql`
    type SessionType{
        _id:ID!
        timeline:String!
        date:String!
        ticket:TicketType!
        film:FilmType!
        halls:[HallType]!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedSessionType{
        _id:ID!
        timeline:String!
        date:String!
        ticket:TicketType!
        film:FilmType!
        halls:[HallType]!
        updatedAt:String!
    }
`

const inputs = gql`
    input SessionInput{
        timeline:String!
        date:String!
        ticket:String!
        film:String!
        halls:[String!]!
    }
`

const queries = gql`
    type Query{
        getSessions(offset:Int!,count:Int!):[SessionType]
        getSession(id:ID!):SessionType
    }
`

const mutations = gql`
    type Mutation{
        createSession(input:SessionInput!):SessionType
        updateSession(input:SessionInput!):UpdatedSessionType
        deleteSession(id:ID!):SessionType
    }
`

const sessionsGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { sessionsGqlSchema}