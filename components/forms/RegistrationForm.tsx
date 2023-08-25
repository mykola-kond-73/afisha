"use client"

import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { Input } from "./Components"
import { FormCallbacksType, RegisterFormPropsType, RegisterValuesType } from "@/types"
import { buttonsColor } from "@/styles"
import { email, phone } from "@/utils/regExp"

export const RegistrationForm = (props: RegisterFormPropsType) => {

    const submit = async (values: RegisterValuesType, { setSubmitting, resetForm }: FormCallbacksType) => {

        const newValues={
            name:{
                firstname:values.firstname,
                lastname:values.lastname
            },
            email:values.email,
            phone:values.phone,
            password:values.password,
        }
        props.register(newValues)

        setSubmitting(false)
        resetForm()
    }


    const formValidate = (values: RegisterValuesType) => {
        const errors: Partial<RegisterValuesType> = {}
        if(!values.firstname) errors.firstname="This field is required"
        if(values.firstname.length < 2) errors.firstname="Must be minimum 2 symbols"
        if(!values.lastname) errors.lastname="This field is required"
        if(values.lastname.length < 2) errors.lastname="Must be minimum 2 symbols"
        if(!values.phone) errors.phone="This field is required"
        if(!phone.test(values.phone)) errors.phone="Invalid phone schema. Must be +380...."
        if (!values.email) errors.email = "This field is required"
        if (!email.test(values.email)) errors.email = "Invalid email schema"
        if (!values.password) errors.password = "This field is required"
        if (values.password.length < 8) errors.password = "Must be minimum 8 symbols"
        if(!values.repeatPassword) errors.repeatPassword="This field is required"
        if(values.password!==values.repeatPassword) errors.repeatPassword="Passwords do not match"

        return errors
    }
    return (
        <Formik onSubmit={submit}
            initialValues={{ email: "", password: "", firstname:"", lastname:"",phone:"",repeatPassword:"" }}
            validate={formValidate}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Box>
                        <Input touched={touched} errors={errors} name="firstname" type="text" placeholder="Enter your firstname" />
                        <Input touched={touched} errors={errors} name="lastname" type="text" placeholder="Enter your lastname" />
                        <Input touched={touched} errors={errors} name="phone" type="text" placeholder="Enter your phone" />
                        <Input touched={touched} errors={errors} name="email" type="email" placeholder="Enter your email" />
                        <Input touched={touched} errors={errors} name="password" type="password" placeholder="Enter your password" />
                        <Input touched={touched} errors={errors} name="repeatPassword" type="password" placeholder="Reenter your password" />

                    </Box>
                    <Box>
                        <Button type='submit' isLoading={props.isLoadRefister} bgColor={buttonsColor}>Register</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}