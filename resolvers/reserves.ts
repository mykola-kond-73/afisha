import { reserveService } from "@/services"
import {UpdateInputOrderReserveType,CreateInputReserveType,InputArgMutationType,IdArgType,ListQueryArgType, ReserveFilterType } from "@/types"

const reservesQueries = {
    getReserves:async(_:any,{offset,count,filter}:ListQueryArgType&ReserveFilterType)=>{
        const reserves=await reserveService.getReserves({offset,count,filter})
        return reserves 
    },
    getReserve:async(_:any,{id}:IdArgType)=>{
        const reserve=await reserveService.getReserve({id})
        return reserve
    }
}

const reservesMutations = {
    createReserve:async(_:any,{input}:InputArgMutationType<CreateInputReserveType>)=>{
        const reserve=await reserveService.createReserve(input)
        return reserve
    },
    updateReserve:async(_:any,{id,input}:InputArgMutationType<UpdateInputOrderReserveType>)=>{
        const reserve=await reserveService.updateReserve(id!,input)
        return reserve
    },
    deleteReserve:async(_:any,{id}:IdArgType)=>{
        const reserve=await reserveService.deleteReserve({id})
        return reserve
    }

}

export {
    reservesQueries,
    reservesMutations
}