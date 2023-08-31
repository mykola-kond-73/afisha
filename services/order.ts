import { GraphQLError } from 'graphql';
import { CancelOrderReserveDataType, CreateInputOrderType, GetOrderDataType, IdArgType, ListQueryArgType, OrderDataType, OrderFilterType, OrdersDataType, UpdateInputOrderReserveType, UpdateOrderReserveDataType } from "@/types";
import { orderModel, userModel } from "@/models";
import Stripe from 'stripe'
import { hallService, mailService, sessionService, userService } from '.';
import { filterPlaces } from '@/utils/servicesUtils';
import { paymentService } from './payment';

class Order {
    private static instance: Order | null = null

    constructor() {
        if (Order.instance) return Order.instance
        else Order.instance = this
    }

    async getOrders({ offset, count, filter }: ListQueryArgType & OrderFilterType): Promise<OrdersDataType> {
        let search = {}
        if (filter?.user) search = { ...search, user: filter.user }
        if (filter?.place) search = { ...search, places: { $in: [filter.place] } }
        if (filter?.session) search = { ...search, session: filter.session }
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
                        { path: "hall" },
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
                        { path: "hall" },
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
        const hall = (await sessionService.getSession({ id: input.session })).hall

        filterPlaces(hall, input.places)
        // const user=await userService.getUser({id:input.user})

        // const stripeCustomer=await paymentService.createCustomer({
        //     email:user.email,
        //     phone:user.phone,
        //     name:user.name.firstname+" "+user.name.lastname
        // })

        // const payment=await paymentService.createPayment({
        //     customerId:stripeCustomer.id,
        //     amount:input.amount,
        //     payment_method:""
        // })

        // if(payment.status!=='succeeded'){
        //     throw new GraphQLError("payment failed", {
        //         extensions: {
        //             code: "PAYMENT_FAILED"
        //         }
        //     })
        // }

        const creaetOrderData={
            ...input,
            payment_status:'succeeded',
            payment_id:"payment_id"

            // payment_status:payment.status,
            // payment_id:payment.id
        }


        await hallService.orderPlaces(hall._id, input.places)

        const order = await orderModel.create(creaetOrderData)
        await userModel.findOneAndUpdate({_id:input.user},{ $addToSet:{history:order._id}})
        const orderResult = await this.getOrder({ id: order._id })
//todo не працює
        // mailService.sendMail("first email", orderResult.user.email)
//todo не працює

        return orderResult
    }
    async updateOrder(id: string, input: UpdateInputOrderReserveType): Promise<UpdateOrderReserveDataType> {
        await orderModel.updateOne({ _id: id }, input)

        const ticket = await orderModel.findById(id)
            .select('-createdAt -user -session -status')
            .lean()

        return ticket as UpdateOrderReserveDataType
    }

    async cancelOrder(id: string): Promise<CancelOrderReserveDataType> {
        const orderPlaces = (await this.getOrder({ id })).places
        const hall = (await this.getOrder({ id })).session.hall

        await hallService.cancelOrderPlaces(hall._id, orderPlaces)

        await orderModel.updateOne({ _id: id }, { status: "cancelled" })

        const order = await orderModel.findById(id, { updatedAt: 1, status: 1,places:1 })

        return order as CancelOrderReserveDataType
    }

    async deleteOrder({ id }: IdArgType): Promise<OrderDataType> {
        const order = await orderModel.findByIdAndDelete(id)
        return order
    }
}

export const orderService = new Order()