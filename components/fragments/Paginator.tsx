"use client"

import { articleBorderColor, curentPageColor } from '@/styles'
import { PaginatorPropsType } from '@/types'
import { Box, Flex, Text } from '@chakra-ui/react'

export const Paginator = (props: PaginatorPropsType) => {
    const pages = Math.round(props.totalCount / props.countInPage)

    const pagesArr = []
    for (let i = 1; i <= pages; i++) {
        pagesArr.push(i)
    }

    return (
        <Box mb="25">
            <Flex direction='row' justifyContent="flex-start" alignItems="center">
                {
                    pagesArr.map((elem: number) => {
                        return (
                            <Text
                                cursor="pointer"
                                w={30}
                                h={30}
                                mx={6}
                                textAlign="center"
                                borderColor={props.currentPage === elem ? curentPageColor : articleBorderColor}
                                borderRadius="6px"
                                borderWidth="3px"

                                key={elem}
                                onClick={() => props.getFunc(elem)}
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