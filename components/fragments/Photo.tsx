"use client"

import ImageNext from "next/image"
import photo from '@/public/static/assets/free-icon-phone-4672884.png'
import { Box, Image } from "@chakra-ui/react"

export const Photo = (props: PropsType) => {
    return (
        <Box>
            {
                props.photo
                    ? <Image src={props.photo} alt="..." />
                    : <ImageNext src={photo} alt="..." />
            }
        </Box>
    )
}

type PropsType = {
    photo?: string
}