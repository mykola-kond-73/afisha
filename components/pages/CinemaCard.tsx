"use client"

import Link from "next/link"
import { Error, Loader, Paginator, Photo } from "../fragments"
import { CinemasCardPropsType, CinemasPageCinemaType } from "@/types"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { articleBorderColor, textColor } from "@/styles"

export const CinemaCard = (props: CinemasCardPropsType) => {

    if (props.error) return <Error code={props.error} size="min" />
    return (
        <Box>
            <Flex direction='column' justifyContent='center' alignItems='center'>
                <Box pt="5" px="12.5">
                    <Flex direction='row' wrap='wrap' justifyContent='space-evenly'>
                        {
                            props.data.cinemas.map((elem: CinemasPageCinemaType) => {
                                return (
                                    <Link href={`/cinemas/${elem._id}`} key={elem._id}>
                                        <Box textColor={textColor} borderWidth="5px" borderColor={articleBorderColor} borderRadius="15px" p="16" mx="8" mb="12.5">
                                            <Flex direction="column" justifyContent="center" alignItems="center">
                                                <Heading m="0" fontSize="x-large" fontWeight="bold">
                                                    {elem.title}
                                                </Heading>
                                                <Box>
                                                    <Photo photo={elem.photo} />
                                                </Box>
                                                <Box>
                                                    <Text>City: {elem.city}</Text>
                                                    <Text>Street: {elem.street}</Text>
                                                    <Text>Rating: {elem.rating}</Text>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Link>
                                )
                            })
                        }
                    </Flex>
                </Box>
                {
                    props.loading &&
                    <Loader />
                }
                <Paginator
                    countInPage={props.countInPage}
                    currentPage={props.currentPage}
                    getFunc={props.getFunc}
                    totalCount={props.data.totalCount}
                />
            </Flex>
        </Box>
    )
}