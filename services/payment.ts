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

}

export const paymentService=new Payment()