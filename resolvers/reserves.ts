import { authenticate } from "@/middlewares"
import { reserveService } from "@/services"
import {UpdateInputOrderReserveType,CreateInputReserveType,InputArgMutationType,IdArgType,ListQueryArgType, ReserveFilterType } from "@/types"

const reservesQueries = {
    getReserves:async(_:any,{offset,count,filter}:ListQueryArgType&ReserveFilterType,context:any)=>{
        await authenticate(context.tocken)

        const reserves=await reserveService.getReserves({offset,count,filter})
        return reserves 
    },
    getReserve:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const reserve=await reserveService.getReserve({id})
        return reserve
    }
}

const reservesMutations = {
    createReserve:async(_:any,{input}:InputArgMutationType<CreateInputReserveType>,context:any)=>{
        await authenticate(context.tocken)

        const reserve=await reserveService.createReserve(input)
        return reserve
    },
    updateReserve:async(_:any,{id,input}:InputArgMutationType<UpdateInputOrderReserveType>,context:any)=>{
        await authenticate(context.tocken)

        const reserve=await reserveService.updateReserve(id!,input)
        return reserve
    },
    cancelReserve:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const order=await reserveService.cancelReserve(id)
        return order
    },
    deleteReserve:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const reserve=await reserveService.deleteReserve({id})
        return reserve
    }

}

export {
    reservesQueries,
    reservesMutations
}