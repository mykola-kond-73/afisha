import { hallService } from "@/services"
import {CreateInputHallType,UpdateInputHallType,InputArgMutationType,IdArgType,ListQueryArgType, HallsFilterType } from "@/types"

const hallsQueries = {
    getHalls:async(_:any,{offset,count,filter}:ListQueryArgType&HallsFilterType)=>{
        const halls=await hallService.getHalls({offset,count,filter})
        return halls
    },
    getHall:async(_:any,{id}:IdArgType)=>{
        const hall=await hallService.getHall({id})
        return hall
    }
}

const hallsMutations = {
    createHall:async(_:any,{input}:InputArgMutationType<CreateInputHallType>)=>{
        const hall=await hallService.createHall(input)
        return hall
    },
    updateHall:async(_:any,{id,input}:InputArgMutationType<UpdateInputHallType>)=>{
        const hall=await hallService.updateHall(id!,input)
        return hall
    },
    deleteHall:async(_:any,{id}:IdArgType)=>{
        const hall=await hallService.deleteHall({id})
        return hall
    }

}

export {
    hallsQueries,
    hallsMutations
}