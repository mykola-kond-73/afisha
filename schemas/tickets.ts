import gql from "graphql-tag";

const types = gql`
    type TicketType{
        _id:ID!
        cost:Int!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedTicketType{
        _id:ID!
        cost:Int!
        updatedAt:String!
    }
`

const inputs = gql`
    input TicketInput{
        cost:Int!
    }
`

const queries = gql`
    type Query{
        getTickets(offset:Int!,count:Int!):[TicketType]
        getTicket(id:ID!):TicketType
    }
`

const mutations = gql`
    type Mutation{
        createTicket(input:TicketInput!):TicketType
        updateTicket(input:TicketInput!):UpdatedTicketType
        deleteTicket(id:ID!):TicketType
    }
`

const ticketsGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export {ticketsGqlSchema}