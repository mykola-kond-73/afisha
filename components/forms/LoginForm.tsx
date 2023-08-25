"use client"

import { Formik, Form } from 'formik'
import { Input } from './Components'
import { FormCallbacksType, LoginFormPropsType, LoginValuesType } from '@/types'
import { Box, Button, ButtonSpinner } from '@chakra-ui/react'
import { email } from '@/utils/regExp'
import { buttonsColor } from '@/styles'

export const LoginForm = (props: LoginFormPropsType) => {

    const submit = async (values:LoginValuesType, { setSubmitting, resetForm }:FormCallbacksType) => {
        props.signIn(values.email,values.password)

        setSubmitting(false)
        resetForm()
    }


    const formValidate = (values:LoginValuesType) => {
        const errors:Partial<LoginValuesType> = {}
        if(!values.email) errors.email="This field is required"
        if(!email.test(values.email)) errors.email="Invalid email schema"
        if(!values.password) errors.password="This field is required"
        if(values.password.length < 8) errors.password="Must be minimum 8 symbols"

        return errors
    }

    return (
        <Formik onSubmit={submit}
            initialValues={{ email: "", password: "" }}
            validate={formValidate}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Box>
                        <Input touched={touched} errors={errors} name="email" type="email" placeholder="Enter your email" />
                        <Input touched={touched} errors={errors} name="password" type="password" placeholder="Enter your password" />
                    </Box>
                    <Box>
                        <Button type='submit' isLoading={props.isLoadLogin} bgColor={buttonsColor}>Sign in</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}
