import { CreateInputOrderType, GetOrderDataType, IdArgType, ListQueryArgType, OrderDataType, OrderFilterType, OrdersDataType, UpdateInputOrderReserveType, UpdateOrderReserveDataType } from "@/types";
import { orderModel } from "@/models";
import Stripe from 'stripe'

class Order {

    // private stripe:Stripe

    // constructor(){
    //     const stripeItem=new Stripe(process.env.STRIPE_PRIVATE_KEY||"",{
    //         apiVersion:'2022-11-15'
    //     })
    //     this.stripe=stripeItem
    // }

    async getOrders({ offset, count, filter }: ListQueryArgType & OrderFilterType): Promise<OrdersDataType> {
        let search = {}
        if (filter?.user) search = { ...search, "user._id": filter.user }
        if (filter?.place) search = { ...search, places: { $in: [filter.place] } }
        if (filter?.session) search = { ...search, "session._id": filter.session }
        if (filter?.status) search = { ...search, status: filter.status }
        if (filter?.payment_status) search = { ...search, payment_status: filter.payment_status }
        if (filter?.payment_id) search = { ...search, payment_id: filter.payment_id }

        const orders: GetOrderDataType[] = await orderModel.find(search)
            .skip(offset)
            .limit(count)
            .populate([
                {
                    path: "session",
                    populate: [
                        { path: "ticket" },
                        { path: "halls" },
                        { path: "film" }
                    ]
                },
                {
                    path: "user",
                    select: "-password -history -reserve"
                },

            ])
            .lean()

        return {
            orders,
            offset,
            count: orders.length
        }
    }
    async getOrder({ id }: IdArgType): Promise<GetOrderDataType> {
        const order = await orderModel.findById(id)
            .populate([
                {
                    path: "session",
                    populate: [
                        { path: "ticket" },
                        { path: "halls" },
                        { path: "film" }
                    ]
                },
                {
                    path: "user",
                    select: "-password -history -reserve"
                },

            ])
            .lean()
        return order as GetOrderDataType
    }
    async createOrder(input: CreateInputOrderType): Promise<GetOrderDataType> {
        const order = await orderModel.create(input)
        const orderResult = await this.getOrder({id:order._id})
        return orderResult 
    }
    async updateOrder(id: string, input: UpdateInputOrderReserveType): Promise<UpdateOrderReserveDataType> {
        await orderModel.updateOne({ _id: id }, input)

        const ticket = await orderModel.findById(id)
            .select('-createdAt -user -session')
            .lean()

        return ticket as UpdateOrderReserveDataType
    }
    async deleteOrder({ id }: IdArgType): Promise<OrderDataType> {
        const order = await orderModel.findByIdAndDelete(id)
        return order
    }
}

export const orderService = new Order()