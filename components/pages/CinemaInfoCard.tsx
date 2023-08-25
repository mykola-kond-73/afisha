"use client"

import { CinemaInfoCardPropsType } from "@/types"
import classes from './cinemaInfoCard.module.scss'
import { Photo } from "@/components/fragments"
import { Card, CardBody, Heading, Stack, Text } from "@chakra-ui/react"

export const CinemaInfoCard = (props:CinemaInfoCardPropsType) => {
    return (
        <Card maxW="sm" mb="12">
            <CardBody>
                <Photo photo={props.photo} />

                <Stack mt="6" spacing="3">
                    <Heading size="md">{props.title}</Heading>

                    <Stack>
                        <Text>City: {props.city}</Text>
                        <Text>Street: {props.street}</Text>
                        <Text>Rating: {props.rating}</Text>
                    </Stack>
                </Stack>
            </CardBody>
        </Card>
    )
}