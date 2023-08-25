"use client"

import { ErrorPropsType } from "@/types"
import { Card, CardBody, Center, Container, Text } from "@chakra-ui/react"

export const Error = (props: ErrorPropsType) => {
    return (
        <Center height={props.size}>
            <Card size="md" textColor="red.800" borderRadius="15px" borderColor="red.800" >
                <CardBody>
                    <Text>{props.code}</Text>
                </CardBody>
            </Card>
        </Center>
    )
}