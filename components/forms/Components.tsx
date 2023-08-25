import { ErrorMessage, Field } from 'formik'
import classes from './components.module.scss'
import { Box, Text } from '@chakra-ui/react'

export const Input = ({ touched, errors, name, type,placeholder }:PropsType) => {
    return (
        <Box className={classes.rootField}>
            <Box className={`${classes.field} ${errors[name] && touched[name] && classes.fieldError}`} >
                <Field type={type} name={name} placeholder={placeholder} style={{ padding: '5px', width: '250px' }} />
            </Box>
            <Box className={errors[name] && touched[name] && classes.errorMessage}>
                <ErrorMessage name={name} />
            </Box>
        </Box>
    )
}

export const Checkbox = ({ touched, errors, name, type,text }:PropsType) => {
    return (
        <Box className={classes.rootField}>
            <Field type={type} name={name} />
            <Text display="inline" className={classes.text}>
                {text}
            </Text>
        </Box>
    )
}

type PropsType={
    name:string
    type:string
    placeholder:string
    errors:any
    touched:any
    text?:string
}