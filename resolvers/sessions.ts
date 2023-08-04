import {InputSessionType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const sessionsQueries = {
    getSessions:(_:any,{offset,count}:ListQueryArgType)=>{},
    getSession:(_:any,{id}:IdArgType)=>{}
}

const sessionsMutations = {
    createSession:(_:any,{input}:InputArgMutationType<InputSessionType>)=>{},
    updateSession:(_:any,{input}:InputArgMutationType<InputSessionType>)=>{},
    deleteSession:(_:any,{id}:IdArgType)=>{}

}

export {
    sessionsQueries,
    sessionsMutations
}