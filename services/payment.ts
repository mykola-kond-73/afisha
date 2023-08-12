class Payment{
    private static instance: Payment | null = null
    // private stripe:Stripe

    constructor() {
        if (Payment.instance) return Payment.instance
        else {
            // const stripeItem=new Stripe(process.env.STRIPE_PRIVATE_KEY||"",{
            //     apiVersion:'2022-11-15'
            // })
            // this.stripe=stripeItem

            Payment.instance = this
        }
    }

}

export const paymentService=new Payment()