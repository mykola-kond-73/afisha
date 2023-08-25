"use client"

import { articleBorderColor } from "@/styles"
import { HallCardPropsType } from "@/types"
import { Box, Heading, Text } from "@chakra-ui/react"

export const HallCard = (props: HallCardPropsType) => {
    let busyStr = ''
    let reserveStr = ''

    props.busy.forEach(elem => {
        busyStr += elem + ", "
    })
    props.reserve.forEach(elem => {
        reserveStr += elem + ", "
    })

    return (
        <Box w="180px" borderRadius="15px" borderWidth="3px" borderColor={articleBorderColor} p="2" mb="4">
            <Heading size="md">{props.title}</Heading>
            <Text>Places: {props.places}</Text>
            <Text>Busy: {busyStr}</Text>
            <Text>Reserve: {reserveStr}</Text>
        </Box>
    )
}