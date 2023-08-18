import { GraphQLError } from 'graphql';
import { IdArgType, ListQueryArgType,InputSessionType, UpdateSessionDataType, SessionDataType, SessionsFilterType, SessionsDataType, GetSessionDataType} from "@/types";
import {sessionModel } from "@/models";
import { dateForSession, timeForSession } from "@/utils/regExp";

class Session {
    private static instance:Session|null=null

    constructor(){
        if(Session.instance) return Session .instance
        else Session.instance=this
    }

    async getSessions({offset,count,filter}:ListQueryArgType&SessionsFilterType):Promise<SessionsDataType>{
        let search={}
        if(filter?.cost){
            const [from,to]=filter.cost.split('-')
            search={...search, "ticket.cost": { $gte: from, $lte: to } }
        }
        if(filter?.film) search={...search, film:filter.film}
        if(filter?.date) search={...search, date:filter.date}
        if(filter?.timeline) search={...search, timeline:filter.timeline}

        const sessions:GetSessionDataType[]=await sessionModel.find({})
            .skip(offset)
            .limit(count)
            .populate('ticket')
            .populate('hall')
            .populate('film')
            .lean()

        return {
            sessions,
            offset,
            count:sessions.length
        }
    }
    async getSession({id}:IdArgType):Promise<GetSessionDataType>{
        const session=await sessionModel.findById(id)
            .populate('ticket')
            .populate('hall')
            .populate('film')
            .lean()
        return session as GetSessionDataType
    }
    async createSession(input:InputSessionType):Promise<SessionDataType>{
        const [from, to]= input.timeline.split("-")
        if(!dateForSession.test(input.date) || !timeForSession.test(from) || !timeForSession.test(to)){
            throw new GraphQLError("Invalid date or timeline format", {
                extensions: {
                    code: "INVALID_DATA"
                }
            })
        }

        const session=await sessionModel.create(input)
        return session
    }
    async updateSession(id:string,input:Partial<InputSessionType>):Promise<UpdateSessionDataType>{
        await sessionModel.updateOne({_id:id},input)
            
        const hall= await sessionModel.findById(id)
            .select('-createdAt')
            .lean()

        return hall as UpdateSessionDataType
    }
    async deleteSession({id}:IdArgType):Promise<SessionDataType>{
        const session=await sessionModel.findByIdAndDelete(id)
        return session
    }
}

export const sessionService = new Session()