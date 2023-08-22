export type FilmCardPropsType = {
    title: string
    description: string
    rating: number
    limitation: string
    photo: string
}

export type HallCardPropsType = {
    title: string
    places: string
    busy: string[]
    reserve: string[]
}

export type SessionCardPropsType={
    timeline: string
    date: string
    ticket: {
        _id: string
        cost: string
    }
    film: FilmCardPropsType
    hall: HallCardPropsType
}