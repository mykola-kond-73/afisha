"use client"

import { buttonsColor } from "@/styles"
import { FormCallbacksType, OrderReserveFormPropsType, OrderReserveValuesType } from "@/types"
import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Input } from "./Components"

export const OrderReserveForm = (props: OrderReserveFormPropsType) => {

    const submit = async (values:OrderReserveValuesType, { setSubmitting, resetForm }: FormCallbacksType) => {

        const strsArr=values.places.split(" ")
        const numArr=strsArr.map(elem=>Number(elem))

        if(props.type==='order') props.order(numArr)
        else if(props.type==='reserve') props.reserve(numArr)

        setSubmitting(false)
        resetForm()
    }


    const formValidate = (values:OrderReserveValuesType) => {
        const errors: Partial<OrderReserveValuesType> = {}

        if(!values.places) errors.places="This field is required"

        return errors
    }

    return (
        <Formik onSubmit={submit}
            initialValues={{ places:""}}
            validate={formValidate}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Box>
                        <Input touched={touched} errors={errors} name="places" type="text" placeholder="Enter places" />
                    </Box>
                    <Box>
                        <Button type='submit' isLoading={props.type==="order"?props.isLoadOrder:props.type==="reserve"?props.isLoadReserve:false} bgColor={buttonsColor}>
                            {
                                props.type==="order"?"Order":props.type==="reserve"?"Reserve":""
                            }
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}