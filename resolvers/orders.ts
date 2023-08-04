import {CreateInputOrderType,UpdateInputOrderReserveType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const ordersQueries = {
    getOrders:(_:any,{offset,count}:ListQueryArgType)=>{},
    getOrder:(_:any,{id}:IdArgType)=>{}
}

const ordersMutations = {
    createOrder:(_:any,{input}:InputArgMutationType<CreateInputOrderType>)=>{},
    updateOrder:(_:any,{input}:InputArgMutationType<UpdateInputOrderReserveType>)=>{},
    deleteOrder:(_:any,{id}:IdArgType)=>{}

}

export {
    ordersQueries,
    ordersMutations
}