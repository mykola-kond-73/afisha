'use client'

import { Box, Flex, Text } from '@chakra-ui/react'
import classes from './footer.module.scss'
import { backgroundColorFooter, footerLinksColor } from '@/styles'

export const Footer = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" bgColor={backgroundColorFooter} h="100px" mt="5">
            <Box fontSize="large" fontWeight="bold">
                <Text display="inline">Phone: </Text>
                <Text display="inline" textColor={footerLinksColor} >+380912223311</Text>
            </Box>
        </Box>
    )
}