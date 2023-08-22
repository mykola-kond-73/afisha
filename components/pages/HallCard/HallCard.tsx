"use client"

import { HallCardPropsType } from "@/types"
import classes from './hallCard.module.scss' 

export const HallCard = (props: HallCardPropsType) => {
    let busyStr=''
    let reserveStr=''

    props.busy.forEach(elem=>{
        busyStr+=elem + ", "
    })
    props.reserve.forEach(elem=>{
        reserveStr+=elem + ", "
    })

    return (
        <article className={classes.article}>
            <h4>{props.title}</h4>
            <div>
                <span>Places:  </span>
                <span>{props.places}</span>
            </div>
            <div>
                <span>busy:  </span>
                <span>{busyStr}</span>
            </div>
            <div>
                <span>reserve:  </span>
                <span>{reserveStr}</span>
            </div>
        </article>
    )
}