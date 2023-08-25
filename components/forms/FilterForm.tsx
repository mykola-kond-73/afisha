"use client"

import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Input } from "./Components"
import { buttonsColor } from "@/styles"
import { FilterFormPropsType, FilterValuesType, FormCallbacksType } from "@/types"

export const FilterForm=(props:FilterFormPropsType)=>{
    const submit = async (values:FilterValuesType , { setSubmitting, resetForm }: FormCallbacksType) => {
        props.setLoad.on()

       
        console.log(values)
        props.setLoad.off()
        props.hideFunc()
        setSubmitting(false)
        resetForm()
    }


    const formValidate = (values:FilterValuesType ) => {
        const errors: Partial<FilterValuesType> = {}
        
        return errors
    }
    return(
        <Formik onSubmit={submit}
            initialValues={{city:"",rating:"0-5",street:"",title:"" }}
            validate={formValidate}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Box>
                        <Input touched={touched} errors={errors} name="title" type="text" placeholder="Enter title" />
                        <Input touched={touched} errors={errors} name="city" type="text" placeholder="Enter city" />
                        <Input touched={touched} errors={errors} name="street" type="text" placeholder="Enter street" />
                        <Input touched={touched} errors={errors} name="rating" type="text" placeholder="Enter rating" />                        
                    </Box>
                    <Box>
                        <Button type='submit' isLoading={props.isLoad} bgColor={buttonsColor}>Find</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}