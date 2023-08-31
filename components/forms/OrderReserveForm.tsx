"use client"

import { buttonsColor, curentPageColor, textColor } from "@/styles"
import { FormCallbacksType, OrderReserveFormPropsType, OrderReserveValuesType } from "@/types"
import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Input } from "./Components"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

const formOptions = {
    style: {
        base: {
            fontSize: "18px",
            color: textColor,
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: curentPageColor
        }
    },
    hidePostalCode: true
}

export const OrderReserveForm = (props: OrderReserveFormPropsType) => {
    const stripe = useStripe()
    const elements = useElements()

    const submit = async (values: OrderReserveValuesType, { setSubmitting, resetForm }: FormCallbacksType) => {
        // @ts-ignore-start
        const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: "card",
            card: elements?.getElement(CardElement),
        })
        // @ts-ignore-end


        const strsArr = values.places.split(" ")
        const numArr = strsArr.map(elem => Number(elem))
        
//todo 
        const orderData={
            paymentMethod,
            places:numArr,
            amount:props.amount
        }
//todo 

        if (props.type === 'order') {
            props.order(numArr,props.amount)
console.log(orderData)
        }
        else if (props.type === 'reserve') props.reserve(numArr)

        setSubmitting(false)
        resetForm()
    }


    const formValidate = (values: OrderReserveValuesType) => {
        const errors: Partial<OrderReserveValuesType> = {}

        if (!values.places) errors.places = "This field is required"

        return errors
    }

    return (
        <Formik onSubmit={submit}
            initialValues={{ places: "" }}
            validate={formValidate}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Box>
                        {
                            props.type === "order" &&
                            <CardElement options={formOptions} />
                        }
                        <Input touched={touched} errors={errors} name="places" type="text" placeholder="Enter places" />
                    </Box>
                    <Box>
                        <Button type='submit' isLoading={props.type === "order" ? props.isLoadOrder : props.type === "reserve" ? props.isLoadReserve : false} bgColor={buttonsColor}>
                            {
                                props.type === "order" ? "Order" : props.type === "reserve" ? "Reserve" : ""
                            }
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}