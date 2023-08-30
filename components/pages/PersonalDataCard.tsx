"use client"

import { HistoryType, PersonalDataCardPropsType, ReserveType } from "@/types"
import { Box, Center, Heading, Text } from "@chakra-ui/react"
import { ActionsPersonalDataCardContainer } from "."
import { HistoryReserveCard } from "./HistoryReserveCard"

export const PersonalDataCard = (props: PersonalDataCardPropsType) => {
    return (
        <Box>
            <Box>
                <Text>
                    Name: {`${props.data.name.firstname} ${props.data.name.lastname}`}
                </Text>
                <Text>
                    Email: {`${props.data.email}`}
                </Text>
                <Text>
                    Phone: {`${props.data.phone}`}
                </Text>
            </Box>
            <Box mt="8">
                <Heading>History</Heading>
                {
                    props.data.history.map((elem: HistoryType) => {
                        return (
                            <HistoryReserveCard
                                key={elem._id}
                                _id={elem._id}
                                payment_id={elem.payment_id}
                                payment_status={elem.payment_status}
                                places={elem.places}
                                session={elem.session}
                                status={elem.status}
                                cancelFunc={()=>props.cancelFunc(elem._id,"order",elem.session.hall?._id!)}
                                isLoad={props.loadOrder}
                            />
                        )
                    })
                }
            </Box>
            <Box mt="8">
                <Heading>Reserves</Heading>
                {
                    props.data.reserve.map((elem: ReserveType) => {
                        return (
                            <HistoryReserveCard
                                key={elem._id}
                                _id={elem._id}
                                places={elem.places}
                                session={elem.session}
                                status={elem.status}
                                cancelFunc={()=>props.cancelFunc(elem._id,"reserve",elem.session.hall?._id!)}
                                isLoad={props.loadReserve}
                            />
                        )
                    })
                }
            </Box>
            <Center>
                <ActionsPersonalDataCardContainer
                    firstBut={{
                        callback:()=> props.delUserFunc(localStorage.getItem("user")!),
                        value: "Delete",
                        isLoad:props.loadDelUser
                    }}
                />
            </Center>
        </Box>
    )
}