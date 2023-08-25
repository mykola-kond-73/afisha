export type CinemaPageParamsType = {
    params: { id: string }
}

export type CinemaPageFilmType = {
    _id: string
    title: string
    description: string
    rating: number
    limitation: string
    photo: string
} & CreateUpdateAtsType

export type CinemaPageHallType = {
    _id: string
    title: string
    places: string
    busy: string[]
    reserve: string[]
} & CreateUpdateAtsType

export type CinemaPageSessionType = {
    _id: string
    timeline: string
    date: string
    ticket: {
        _id: string
        cost: string
    } & CreateUpdateAtsType
    film: CinemaPageFilmType
    hall: CinemaPageHallType

} & CreateUpdateAtsType

export type CinemasPageCinemaType = {
    _id: string
    title: string
    city: string
    street: string
    rating: number
    photo: string
}&CreateUpdateAtsType

export type HeaderPropsType={
    uri:string
    showModal:()=>void
    showFilterPanel:()=>void
    showPersonalDataPanel:()=>void
    showHorizontalPanel:()=>void
    logout:()=>void
}

type CreateUpdateAtsType = {
    createdAt: string
    updatedAt: string
}