"use client"

import { OrderModal } from '@/components/modals'
import { buttonsColor } from '@/styles'
import { Box, Button, ButtonGroup, useBoolean } from '@chakra-ui/react'
import { ActionCardPropsType } from '@/types'

export const ActionsCard = (props:ActionCardPropsType) => {
    return (
        <Box py="4">
            <OrderModal
                amount={props.amount}
                show={props.show}
                hideFunc={props.hideFunc}
                type={props.type}
                isLoadOrder={props.isLoadOrder}
                isLoadReserve={props.isLoadReserve}
                order={props.order}
                reserve={props.reserve}
                orderError={props.orderError}
                reserveError={props.reserveError}
            />
            <ButtonGroup>
                <Button bgColor={buttonsColor} onClick={() => props.showModal("order")}>Busy</Button>
                <Button bgColor={buttonsColor} onClick={() => props.showModal("reserve")}>Reserve</Button>
            </ButtonGroup>
        </Box>
    )
}