import {  CreateInputOrderType, IdArgType, ListQueryArgType, OrderDataType, UpdateInputOrderReserveType, UpdateOrderReserveDataType} from "@/types";
import { orderModel} from "@/models";
import Stripe from 'stripe'

class Order {
    private stripe:Stripe

    constructor(){
        const stripeItem=new Stripe(process.env.STRIPE_PRIVATE_KEY||"",{
            apiVersion:'2022-11-15'
        })
        this.stripe=stripeItem
    }

    async getOrders({offset,count}:ListQueryArgType):Promise<OrderDataType>{}
    async getOrder({id}:IdArgType):Promise<OrderDataType>{}
    async createOrder(input:CreateInputOrderType):Promise<OrderDataType>{}
    async updateOrder(input:UpdateInputOrderReserveType):Promise<UpdateOrderReserveDataType>{}
    async deleteOrder({id}:IdArgType):Promise<OrderDataType>{}
}

export const orderService = new Order()