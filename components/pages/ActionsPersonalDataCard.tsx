"use client"

import { buttonsColor } from "@/styles"
import { ActionsPersonalDataCardPropsType } from "@/types"
import { Box, Button, ButtonGroup } from "@chakra-ui/react"

export const ActionsPersonalDataCard = (props: ActionsPersonalDataCardPropsType) => {
    return (
        <Box mt="8">
            <Button bgColor={buttonsColor} isLoading={props.firstBut.isLoad} onClick={() => props.firstBut.callback()}>{props.firstBut.value}</Button>
        </Box>
    )
}