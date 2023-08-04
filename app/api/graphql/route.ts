import { gql } from 'graphql-tag';
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { ApolloServer } from "@apollo/server"
import { NextRequest } from 'next/server'
import mongoDBConnect from '../../../lib/dbConnected'
import { authGqlSchema, cinemasGqlSchema, filmsGqlSchema, hallsGqlSchema, ordersGqlSchema, reservesGqlSchema, sessionsGqlSchema, ticketsGqlSchema, tockensGqlSchema, usersGqlSchema } from '@/schemas';
import { authMutations, cinemasMutations, cinemasQueries, filmsMutations, filmsQueries, hallsMutations, hallsQueries, ordersMutations, ordersQueries, reservesMutations, reservesQueries, sessionsMutations, sessionsQueries, ticketsMutations, ticketsQueries, tockensMutations, tockensQueries, usersMutations, usersQueries } from '@/resolvers';

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
    ${authGqlSchema}
`

const resolvers = {
    Query: {
        ...cinemasQueries,
        ...filmsQueries,
        ...sessionsQueries,
        ...hallsQueries,
        ...ticketsQueries,
        ...usersQueries,
        ...ordersQueries,
        ...reservesQueries,
        ...tockensQueries
    },
    Mutation: {
        ...cinemasMutations,
        ...filmsMutations,
        ...sessionsMutations,
        ...hallsMutations,
        ...ticketsMutations,
        ...usersMutations,
        ...ordersMutations,
        ...reservesMutations,
        ...tockensMutations,
        ...authMutations
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