import { UserNameModelType } from "./models"

export type InputArgMutationType<T> = {
    input: T
    id?:string
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
    films: Array<string>
    halls: Array<string>
    sessions: Array<string>
}

export type InputCreateFilmType = {
    title: string
    description: string
    limitation: string
}

export type InputUpdateFilmType={
    title?: string
    description?: string
    rating?: number
    limitation?: string
}

export type InputSessionType = {
    timeline: string
    date: string
    ticket: string
    film: string
    hall: string
}

export type CreateInputHallType = {
    title: string
    places: number
}

export type UpdateInputHallType = {
    title?: string
    places?: number
}

export type InputTicketType = {
    cost: number
}

export type CreateInputUserType = {
    name: UserNameModelType
    email: string
    password: string
    phone:string
}

export type UpdateInputUserType = {
    name: UserNameModelType
}

type statusType = 'active' | 'cencelled'

export type CreateInputOrderType = {
    user: string
    session: string
    places:Array<number>
}

export type UpdateInputOrderReserveType = {
    places?:Array<number>
}

export type CreateInputReserveType = {
    user: string
    session: string
    places:Array<number>
}

export type InputLoginType = {
    email: string
    password: string
}

export type InputRefreshType = {
    refreshToken: string
}
export type InputPaymentType = {
    id: string;
    amount: number;
    customerId: string;
}

export type InputStripeCustomerType = {
    email: string;
    phone: string;
    name: string;
}

export type InputCreateRefundType = {
    paymentId: string;
}