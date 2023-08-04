import { gql } from 'graphql-tag';
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { ApolloServer } from "@apollo/server"
import { NextRequest } from 'next/server'
import mongoDBConnect from '../../../lib/dbConnected'
import { cinemasGqlSchema, filmsGqlSchema, hallsGqlSchema, ordersGqlSchema, reservesGqlSchema, sessionsGqlSchema, ticketsGqlSchema, tockensGqlSchema, usersGqlSchema } from '@/schemas';
import { cinemasQueries, cinemasMutations } from '@/resolvers';

const typeDefs = gql`
    ${cinemasGqlSchema}
    ${filmsGqlSchema}
    ${sessionsGqlSchema}
    ${hallsGqlSchema}
    ${ticketsGqlSchema}
    ${usersGqlSchema}
    ${ordersGqlSchema}
    ${reservesGqlSchema}
    ${tockensGqlSchema}
`

const resolvers = {
    Query: {
        ...cinemasQueries
    },
    Mutation: {
        ...cinemasMutations
    }
}

const server = new ApolloServer({
    resolvers,
    typeDefs,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server)

mongoDBConnect()



export async function GET(request: NextRequest) {
    return handler(request)
}

export async function POST(request: NextRequest) {
    return handler(request)
}