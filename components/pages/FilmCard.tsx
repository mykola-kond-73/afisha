"use client"

import { Photo } from "@/components/fragments/Photo"
import { articleBorderColor } from "@/styles"
import { FilmCardPropsType } from "@/types"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"

export const FilmCard = (props: FilmCardPropsType) => {
    return (
        <Box w="300px" borderRadius="15px" borderWidth="3px" borderColor={articleBorderColor} p="2" mb="4">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Heading size="md">{props.title}</Heading>
                <Text>Description: {props.description}</Text>
                <Text>Age limitation: {props.limitation}</Text>
                <Box>
                    <Photo photo={props.photo} />
                </Box>
                <Text>Rating: {props.rating}</Text>
            </Flex>
        </Box>
    )
}