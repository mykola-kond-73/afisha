"use client"

import { Photo } from "@/components/fragments/Photo/Photo"
import { FilmCardPropsType } from "@/types"
import classes from './filmCard.module.scss'

export const FilmCard = (props: FilmCardPropsType) => {
    return (
        <article className={classes.article}>
            <h4>{props.title}</h4>
            <div>
                <p>Description:</p>
                <p>{props.description}</p>
            </div>
            <div>
                <span>Age limitation:  </span>
                <span>{props.limitation}</span>
            </div>
            <div>
                <Photo photo={props.photo}/>
            </div>
            <div>
                <span>Rating:  </span>
                <span>{props.rating}</span>
            </div>
        </article>
    )
}