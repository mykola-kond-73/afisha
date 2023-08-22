"use client"

import { FilmCard } from '../FilmCard/FilmCard'
import { SessionCardPropsType } from "@/types"
import { HallCard } from "../HallCard/HallCard"
import classes from './sessionsCard.module.scss'
import { ActionsCard } from "../ActionsCard/ActionsCard"


export const SessionCard = (props: SessionCardPropsType) => {
    const days=["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const mounths=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let [dayOfWeek, mounthOfYear, num, year]=props.date.split(" ")
    for(let day of days){
        if(day.slice(0,3)===dayOfWeek) dayOfWeek=day
    }
    for(let mounth of mounths){
        if(mounth.slice(0,3)===mounthOfYear) mounthOfYear=mounth
    }

    let [from,to]=props.timeline.split("-")
    from=from.slice(0,8)
    to=to.slice(0,8)

    return (
        <article className={classes.article}>            
            <div>
                <div>
                    <span>Date:  </span>
                    <span>{`${dayOfWeek} ${mounthOfYear} ${num} ${year}`}</span>
                </div>
                <div>
                    <span>Time:  </span>
                    <span>{`${from}-${to}`}</span>
                </div>
            </div>

            <div className={classes.film}>
                <h4>Film</h4>
                <FilmCard
                    title={props.film.title}
                    description={props.film.description}
                    limitation={props.film.limitation}
                    photo={props.film.photo}
                    rating={props.film.rating}
                />
            </div>

            <div className={classes.hall}>
                <h4>Hall</h4>
                <HallCard
                    title={props.hall.title}
                    busy={props.hall.busy}
                    places={props.hall.places}
                    reserve={props.hall.reserve}
                />
            </div>

            <div>
                <span>Cost:  </span>
                <span>{props.ticket.cost}</span>
            </div>

            <ActionsCard />
        </article>
    )
}

