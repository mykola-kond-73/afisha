import { authenticate } from "@/middlewares"
import { orderService } from "@/services"
import {CreateInputOrderType,UpdateInputOrderReserveType,InputArgMutationType,IdArgType,ListQueryArgType, OrderFilterType } from "@/types"

const ordersQueries = {
    getOrders:async(_:any,{offset,count,filter}:ListQueryArgType&OrderFilterType,context:any)=>{
        await authenticate(context.tocken)

        const orders=await orderService.getOrders({offset,count,filter})
        return orders
    },
    getOrder:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const order=await orderService.getOrder({id})
        return order
    }
}

const ordersMutations = {
    createOrder:async(_:any,{input}:InputArgMutationType<CreateInputOrderType>,context:any)=>{
        await authenticate(context.tocken)
// console.log(input)
        const order=await orderService.createOrder(input)
        return order
    },
    updateOrder:async(_:any,{id,input}:InputArgMutationType<UpdateInputOrderReserveType>,context:any)=>{
        await authenticate(context.tocken)

        const order=await orderService.updateOrder(id!,input)
        return order
    },
    cancelOrder:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const order=await orderService.cancelOrder(id)
        return order
    },
    deleteOrder:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const order=await orderService.deleteOrder({id})
        return order
    }

}

export {
    ordersQueries,
    ordersMutations
}