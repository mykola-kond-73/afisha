"use client"

import { HistoryType, ReserveType } from "@/types"
import { Box, Flex, Text } from "@chakra-ui/react"
import { ActionsPersonalDataCardContainer, SessionCard } from "."
import { articleBorderColor } from "@/styles"

export const HistoryReserveCard = (props: (HistoryType | ReserveType) & {cancelFunc:()=>void,isLoad:boolean}) => {
    return (
        <Box mt="6" borderColor={articleBorderColor} borderRadius="15px" borderWidth="3px" p="3">
            <Flex direction="column" alignItems="center">
                <SessionCard
                    _id={props.session._id}
                    date={props.session.date}
                    film={props.session.film}
                    ticket={props.session.ticket}
                    timeline={props.session.timeline}
                    noHalls={true}
                />
                <Box>
                    <Text>Places: {props.places}</Text>
                    <Text>Status: {props.status}</Text>
                    {
                        (props as HistoryType).payment_status &&
                        <Text>Payment: {(props as HistoryType).payment_status}</Text>
                    }

                </Box>

                <ActionsPersonalDataCardContainer
                    firstBut={{
                        callback: props.cancelFunc,
                        value: "Cancel",
                        isLoad:props.isLoad
                    }}
                />
            </Flex>
        </Box>
    )
}