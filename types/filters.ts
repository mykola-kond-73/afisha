type FilterType<T>={
    filter:T
}

export type TicketsFilterType=FilterType<{range?:string}>
export type FilmsFilterType=FilterType<{
    title?:string
    limitation?:"18+"|"16+"|"12+"|"0+"
    rating?:string
}>
export type HallsFilterType=FilterType<{
    title?:string
    places?:string
}>
export type SessionsFilterType=FilterType<{
    timeline?:string
    date?:string
    film?:string
    cost?:string
}>
export type CinemasFilterType=FilterType<{
    title?:string
    city?:string
    street?:string
    rating?:string
    film?:string
    session?:string
}>
export type ReserveFilterType=FilterType<{
    user?:string
    session?:string
    place?:number
    status?:"active"|"cancelled"
}>
export type OrderFilterType=FilterType<{
    user?:string
    session?:string
    place?:number
    status?:"active"|"cancelled"
    payment_status?:boolean
    payment_id?:string
}>
export type UserFilterType=FilterType<{
    firstname?:string
    lastname?:string
    order?:string
    reserve?:string
    email?:string
}>
export type TockenFilterType=FilterType<{
    user?:string
}>