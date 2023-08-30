"use client"

import { GET_CINEMAS } from '@/API'
import { articleBorderColor, curentPageColor } from '@/styles'
import { useLazyQuery, } from '@apollo/client'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useState,  } from 'react'

export const Paginator = (props: PropsType) => {

    const [currentPage, setCurrentPage] = useState(1)
    const countInPage = 1
    const pages = Math.round(props.totalCount / countInPage)

    const pagesArr = []
    for (let i = 1; i <= pages; i++) {
        pagesArr.push(i)
    }

    const [getCinemas, { data, error, loading }] = useLazyQuery(GET_CINEMAS)

    const get = async (currentPage: number) => {
        const { data: cinemasData } = await getCinemas({
            variables: {
                offset: (currentPage - 1) * countInPage,
                count: countInPage,
                filter: {}
            }
        })
        setCurrentPage(currentPage)
    }

    return (
        <Box mb="25">
            <Flex direction='row' justifyContent="flex-start" alignItems="center">
                {
                    pagesArr.map((elem: number) => {
                        return (
                            <Text
                                w={30}
                                h={30}
                                mx={6}
                                textAlign="center"
                                borderColor={currentPage === elem ? curentPageColor : articleBorderColor}
                                borderRadius="6px"
                                borderWidth="3px"

                                key={elem}
                                onClick={() => get(elem)}
                            >
                                {elem}
                            </Text>
                        )
                    })
                }
            </Flex>
        </Box>
    )
}

type PropsType = {
    totalCount: number
}