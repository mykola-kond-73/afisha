import { gql } from 'graphql-tag';
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { ApolloServer } from "@apollo/server"
import { NextRequest } from 'next/server'
import { authGqlSchema, cinemasGqlSchema, filmsGqlSchema, hallsGqlSchema, ordersGqlSchema, reservesGqlSchema, sessionsGqlSchema, ticketsGqlSchema, tockensGqlSchema, usersGqlSchema } from '@/schemas';
import { authMutations, cinemasMutations, cinemasQueries, filmsMutations, filmsQueries, hallsMutations, hallsQueries, ordersMutations, ordersQueries, reservesMutations, reservesQueries, sessionsMutations, sessionsQueries, ticketsMutations, ticketsQueries, tockensMutations, tockensQueries, usersMutations, usersQueries } from '@/resolvers';
import { handleServerError } from '@/utils/errors';
import { reserveService, tockenService } from '@/services';
import { DB } from '@/lib/dbConnect2';
import { queryLogger } from '@/utils/logger';

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
    formatError:handleServerError
})

const handler = startServerAndCreateNextHandler<NextRequest>(server,{
    context:async(req,res)=>{        
        queryLogger.log('info', `${req.method} ${req.url} ${req.geo} ${req.ip}`)
        return {tocken:req.headers.get("Authorization")}
    }
})

const db=new DB()
db.connect()

setInterval(async()=>{
    const count=await reserveService.getCountDocuments()
    const reservesData=await reserveService.getReserves({offset:0,count,filter:{}})

    for(let reserve of reservesData.reserves){
        const [from, to]=reserve.session.timeline.split('-')
        const date=new Date(Date.now())
        date.setTime(date.getTime()+10*60*1000)

        if(reserve.createdAt.toDateString() === date.toDateString()){
            if(to >= date.toTimeString()){
                await reserveService.cancelReserve(reserve._id.toString())
            }
        }
        if(reserve.createdAt < date && reserve.status!=="cancelled"){
            await reserveService.cancelReserve(reserve._id.toString())
        }
    }


    const countTockens=await tockenService.getCountDocuments()
    const tockensData=await tockenService.getTockens({offset:0,count:countTockens,filter:{}})

    for(let tocken of tockensData.tockens){
        const dateNow=new Date(Date.now())
        const dateCreateTocken=new Date(tocken.createdAt)
        dateCreateTocken.setTime(dateCreateTocken.getTime()+12*60*60*1000)
        if(dateNow > dateCreateTocken){
            await tockenService.deleteTocken({id:tocken._id.toString()})
        }
    }

    console.log("\nCleared tockens and reserves\n")
},5*60*1000)







export async function GET(request: NextRequest) {
    return handler(request)
}

export async function POST(request: NextRequest) {
    return handler(request)
}