import {UpdateInputOrderReserveType,CreateInputReserveType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const reservesQueries = {
    getReserves:(_:any,{offset,count}:ListQueryArgType)=>{},
    getReserve:(_:any,{id}:IdArgType)=>{}
}

const reservesMutations = {
    createReserve:(_:any,{input}:InputArgMutationType<CreateInputReserveType>)=>{},
    updateReserve:(_:any,{input}:InputArgMutationType<UpdateInputOrderReserveType>)=>{},
    deleteReserve:(_:any,{id}:IdArgType)=>{}

}

export {
    reservesQueries,
    reservesMutations
}