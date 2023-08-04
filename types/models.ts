import {Types,Schema} from "mongoose"

export type CinemaModelType={
    title:string
    city:string
    street:string
    rating:Types.Decimal128
    films:Array<Schema.Types.ObjectId>
    halls:Array<Schema.Types.ObjectId>
    sessions:Array<Schema.Types.ObjectId>
}&TimestampsType

export type FilmModelType={
    title:string
    description:string
    rating:Schema.Types.Decimal128
    limitation: '18+'|'16+'|'12+'|'0+'
}&TimestampsType

export type SessionModelType={
    timeline:string
    date:Date
    ticket:Schema.Types.ObjectId
    film:Schema.Types.ObjectId
    halls:Array<Schema.Types.ObjectId>
}&TimestampsType

export type HallModelType={
    title:string
    places:number
    busy:Array<number>
    reserve:Array<number>
}&TimestampsType

export type TicketModelType={
    cost:Types.Decimal128
}&TimestampsType

export type UserNameModelType={
    firstname:string
    lastname:string
}

export type UserModelType={
    name:UserNameModelType
    history:Array<Schema.Types.ObjectId>
    reserve:Array<Schema.Types.ObjectId>
    email:string
    password:string
}&TimestampsType

export type OrderModelType={
    user:Schema.Types.ObjectId
    session:Schema.Types.ObjectId
    count:number
    payment_status:boolean
    payment_id:string
    status:'active'|'cancelled'
}&TimestampsType

export type ReserveModelType={
    user:Schema.Types.ObjectId
    session:Schema.Types.ObjectId
    count:number
    status:'active'|'cancelled'
}&TimestampsType

export type TockenModelType={
    user:Schema.Types.ObjectId
    refreshToken:string
}&TimestampsType

type TimestampsType={
    createdAt:Date
    updatedAt:Date
}