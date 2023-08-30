"use client"

import { ActionsPersonalDataCardPropsType } from "@/types"
import { ActionsPersonalDataCard } from "../pages/ActionsPersonalDataCard"

export const ActionsPersonalDataCardContainer=(props:ActionsPersonalDataCardPropsType)=>{
    return(
        <ActionsPersonalDataCard 
            firstBut={props.firstBut}
            
        />
    )
}