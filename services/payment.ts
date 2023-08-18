import { InputCreateRefundType, InputPaymentType, InputStripeCustomerType } from "@/types"
import { STRIPE_PRIVATE_KEY } from "@/utils/env"
import Stripe from "stripe"

class Payment{
    private static instance: Payment | null = null
    private stripe:Stripe|null=null

    constructor() {
        if (Payment.instance) return Payment.instance
        else {
            const stripeItem=new Stripe(STRIPE_PRIVATE_KEY!,{
                apiVersion:'2022-11-15'
            })
            this.stripe=stripeItem

            Payment.instance = this
        }
    }

    async createPaymentMethod(){
        const paymentMethod=await this.stripe!.paymentMethods.create({
            type:'card',
            card:{
                number:"4242424242424242",
                exp_month:4,
                exp_year:2025,
                cvc:"555"
            }
        })
        return paymentMethod
    }

    async createPayment(input:InputPaymentType){
        const payment= await this.stripe!.paymentIntents.create({
            payment_method:input.id,
            amount:input.amount,
            currency:"USD",
            description:"test payment",
            confirm:true,
            
            customer: input.customerId
        })

        return payment
    }

    async createCustomer(input:InputStripeCustomerType){
        const customer=await this.stripe!.customers.create(input)
        return customer
    }

    async getCustomerById(customerId:string){
        const customer=await this.stripe!.customers.retrieve(customerId)
        return customer
    }

    async deleteCustomerById(customerId:string){
        const customer=await this.stripe!.customers.del(customerId)
        return customer
    }

    async createRefund(input:InputCreateRefundType){
        const refund=await this.stripe!.refunds.create({
            payment_intent:input.paymentId,
        })

        return refund
    }

}

export const paymentService=new Payment()