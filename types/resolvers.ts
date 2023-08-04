import { UserNameModelType } from "./models"

export type InputArgMutationType<T> = {
    input: T
}

export type IdArgType = {
    id: string
}

export type ListQueryArgType = {
    offset: number
    count: number
}

export type InputCinemaType = {
    title: string
    city: string
    street: string
    rating: number
    films: Array<string>
    halls: Array<string>
    sessions: Array<string>
}

export type InputFilmType = {
    title: string
    description: string
    rating: number
    limitation: string
}

export type InputSessionType = {
    timeline: string
    date: string
    ticket: string
    film: string
    halls: Array<string>
}

export type CreateInputHallType = {
    title: string
    places: number
}

export type UpdateInputHallType = {
    title: string
    places: number
    busy: Array<number>
    reserve: Array<number>
}

export type InputTicketType = {
    cost: number
}

export type CreateInputUserType = {
    name: UserNameModelType
    email: string
    password: string
}

export type UpdateInputUserType = {
    name: UserNameModelType
}

type statusType = 'active' | 'cencelled'

export type CreateInputOrderType = {
    user: string
    sessions: string
    count: number
    payment_status: boolean
    payment_id: string
    status: statusType
}

export type UpdateInputOrderReserveType = {
    count: number
    status: statusType
}

export type CreateInputReserveType = {
    user: string
    sessions: string
    count: number
    status: statusType
}

export type InputLoginType = {
    email: string
    password: string
}

export type InputRefreshType = {
    refreshToken: string
}