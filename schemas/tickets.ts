import gql from "graphql-tag";

const types = gql`
    type TicketType{
        _id:ID!
        cost:Float!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedTicketType{
        _id:ID!
        cost:Float!
        updatedAt:String!
    }

    type TicketsType{
        tickets:[TicketType]!
        offset:Int!
        count:Int!
    }
`

const inputs = gql`
    input TicketInput{
        cost:Float!
    }

    input FilterTicketInput{
        range:String
    }
`

const queries = gql`
    type Query{
        getTickets(offset:Int!,count:Int!,filter:FilterTicketInput):TicketsType
        getTicket(id:ID!):TicketType
    }
`

const mutations = gql`
    type Mutation{
        createTicket(input:TicketInput!):TicketType
        updateTicket(id:String!,input:TicketInput!):UpdatedTicketType
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