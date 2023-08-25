import { OrderModalPropsType } from ".."

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

export type SessionCardPropsType = {
    _id:string
    timeline: string
    date: string
    ticket: {
        _id: string
        cost: string
    }
    film: FilmCardPropsType
    hall: HallCardPropsType
}

export type CinemaInfoCardPropsType = {
    photo: string
    title: string
    city: string
    street: string
    rating: number
}

export type PersonalDataCardType = {
    _id: string
    name: {
        firstname: string
        lastname: string
    }
    email: string
    phone: string
    history: Array<{
        _id: string
        session: SessionCardPropsType & { _id: string }
        places: number[]
        payment_status: string
        payment_id: string
        status: string
    }>
    reserve: Array<{
        _id: string
        session: SessionCardPropsType & { _id: string }
        places: number[]
        status: string
    }>
}

export type PersonalDataCardPropsType={
    // data:PersonalDataCardType
    data:any
}

export type ActionCardPropsType={
    showModal:(type: "order" | "reserve")=>void
}&OrderModalPropsType

export type ActionCardContainerPropsType={
    sessionId:string
}