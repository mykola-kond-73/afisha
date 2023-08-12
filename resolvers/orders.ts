import { orderService } from "@/services"
import {CreateInputOrderType,UpdateInputOrderReserveType,InputArgMutationType,IdArgType,ListQueryArgType, OrderFilterType } from "@/types"

const ordersQueries = {
    getOrders:async(_:any,{offset,count,filter}:ListQueryArgType&OrderFilterType)=>{
        const orders=await orderService.getOrders({offset,count,filter})
        return orders
    },
    getOrder:async(_:any,{id}:IdArgType)=>{
        const order=await orderService.getOrder({id})
        return order
    }
}

const ordersMutations = {
    createOrder:async(_:any,{input}:InputArgMutationType<CreateInputOrderType>)=>{
        const order=await orderService.createOrder(input)
        return order
    },
    updateOrder:async(_:any,{id,input}:InputArgMutationType<UpdateInputOrderReserveType>)=>{
        const order=await orderService.updateOrder(id!,input)
        return order
    },
    cancelOrder:async(_:any,{id}:IdArgType)=>{
        const order=await orderService.cancelOrder(id)
        return order
    },
    deleteOrder:async(_:any,{id}:IdArgType)=>{
        const order=await orderService.deleteOrder({id})
        return order
    }

}

export {
    ordersQueries,
    ordersMutations
}