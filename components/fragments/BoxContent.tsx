"use client"

import { BoxContentPropsType } from "@/types"
import { Box,  Flex, Heading } from "@chakra-ui/react"

export const BoxContent = (props: BoxContentPropsType) => {
    return (
        <Box mb="12">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Heading size="md" pb="4">{props.title}</Heading>

                <Box>
                    <Flex direction="row" justifyContent="center" wrap="wrap">
                        {props.children}
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
} 