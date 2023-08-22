"use client"

import Image from "next/image"
import photo from '@/public/static/assets/free-icon-phone-4672884.png'

export const Photo=(props:PropsType)=>{
    return(
        props.photo
        ? <Image src={props.photo} alt="..." />
        : <Image src={photo} alt="..." />
    )
}

type PropsType={
    photo?:string
}