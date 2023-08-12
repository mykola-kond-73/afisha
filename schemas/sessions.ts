import gql from "graphql-tag";

const types = gql`
    type SessionType{
        _id:ID!
        timeline:String!
        date:String!
        ticket:TicketType!
        film:FilmType!
        hall:HallType!
        createdAt:String!
        updatedAt:String!
    }

    type CreateSessionType{
        _id:ID!
        timeline:String!
        date:String!
        ticket:String!
        film:String!
        hall:String!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedSessionType{
        _id:ID!
        timeline:String!
        date:String!
        ticket:String!
        film:String!
        hall:String!
        updatedAt:String!
    }

    type SessionsType{
        sessions:[SessionType]!
        offset:Int!
        count:Int!
    }
`

const inputs = gql`
    input CreateSessionInput{
        timeline:String!
        date:String!
        ticket:String!
        film:String!
        hall:String!
    }

    input UpdateSessionInput{
        timeline:String
        date:String
        ticket:String
        film:String
        hall:String!
    }

    input FilterSessionInput{
        timeline:String
        date:String
        film:String
        cost:String
    }
`

const queries = gql`
    type Query{
        getSessions(offset:Int!,count:Int!,filter:FilterSessionInput!):SessionsType
        getSession(id:ID!):SessionType
    }
`

const mutations = gql`
    type Mutation{
        createSession(input:CreateSessionInput!):CreateSessionType
        updateSession(id:String!, input:UpdateSessionInput!):UpdatedSessionType
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