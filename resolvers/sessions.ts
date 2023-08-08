import { sessionService } from "@/services"
import {InputSessionType,InputArgMutationType,IdArgType,ListQueryArgType, SessionsFilterType } from "@/types"

const sessionsQueries = {
    getSessions:async(_:any,{offset,count,filter}:ListQueryArgType&SessionsFilterType)=>{
        const sessions=await sessionService.getSessions({offset,count,filter})
        return sessions
    },
    getSession:async(_:any,{id}:IdArgType)=>{
        const session=await sessionService.getSession({id})
        return session
    }
}

const sessionsMutations = {
    createSession:async(_:any,{input}:InputArgMutationType<InputSessionType>)=>{
        const session=await sessionService.createSession(input)
        return session
    },
    updateSession:async(_:any,{id,input}:InputArgMutationType<Partial<InputSessionType>>)=>{
        const session=await sessionService.updateSession(id!,input)
        return session
    },
    deleteSession:async(_:any,{id}:IdArgType)=>{
        const session=await sessionService.deleteSession({id})
        return session
    }
}

export {
    sessionsQueries,
    sessionsMutations
}