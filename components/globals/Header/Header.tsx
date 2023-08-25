"use client"

import Image from "next/image"
import rightImg from '@/public/static/assets/free-icon-keyboard-left-arrow-button-60775.png'
import lefttImg from '@/public/static/assets/free-icon-keyboard-right-arrow-button-60758.png'
import centerImg from '@/public/static/assets/free-icon-expand-button-60781.png'
import classes from './header.module.scss'
import { HeaderPropsType } from "@/types"
import { Box, Flex, Text } from "@chakra-ui/react"
import { backgroundColorBody, backgroundColorHeader, linksColor } from "@/styles"

export const Header = (props: HeaderPropsType) => {
    return (
        <Box fontSize="large" fontWeight="bold">

            <Box bgColor={backgroundColorHeader} h="14">
                <Flex direction="row" justifyContent="end" pt="4" pr="9">
                    <Box>
                        {
                            !localStorage.getItem("tocken")
                                ? <Text textColor={linksColor} onClick={props.showModal}>
                                    Sign In
                                </Text>
                                : <Text textColor={linksColor} onClick={props.logout}>
                                    sign out
                                </Text>
                        }
                    </Box>
                </Flex>
            </Box>
            <Box bgColor={backgroundColorBody}>
                <Flex direction="row" justifyContent="center">
                    <Box pt="3" px="3" w="full" className={classes.coupleButtons}>
                        <Flex direction="row" justifyContent={props.uri !== "/cinemas" ? "flex-end" : "space-between"}>
                            {
                                props.uri === "/cinemas" &&
                                <Box onClick={props.showFilterPanel}>
                                    <Image src={lefttImg} alt="..." />
                                </Box>
                            }
                            <Box onClick={props.showPersonalDataPanel}>
                                <Image src={rightImg} alt="..." />
                            </Box>
                        </Flex>
                    </Box>

                    <Box pt="3" className={classes.downButton} onClick={props.showHorizontalPanel}>
                        <Image src={centerImg} alt="..." />
                    </Box>

                </Flex>
            </Box>
        </Box>
    )
}