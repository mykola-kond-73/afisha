import {CreateInputHallType,UpdateInputHallType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const hallsQueries = {
    getHalls:(_:any,{offset,count}:ListQueryArgType)=>{},
    getHall:(_:any,{id}:IdArgType)=>{}
}

const hallsMutations = {
    createHall:(_:any,{input}:InputArgMutationType<CreateInputHallType>)=>{},
    updateHall:(_:any,{input}:InputArgMutationType<UpdateInputHallType>)=>{},
    deleteHall:(_:any,{id}:IdArgType)=>{}

}

export {
    hallsQueries,
    hallsMutations
}