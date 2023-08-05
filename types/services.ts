import {Types} from "mongoose"
import { CinemaModelType, FilmModelType, HallModelType, OrderModelType, ReserveModelType, SessionModelType, TicketModelType, TockenModelType, UserModelType, UserNameModelType, } from "./models"

type RemovedCreateAtType<T>=Omit<T,'createdAt'>

type ReturnedDataFromModelType<T>={
    _id:Types.ObjectId
}&T

type ListDataType<T extends string,U>={
    offset:number
    count:number
}&Record<T,Array<U>>

export type CinemaDataType=ReturnedDataFromModelType<CinemaModelType>
export type CinemasDataType= ListDataType<"cinemas",CinemaDataType>

export type FilmDataType=ReturnedDataFromModelType<FilmModelType>
export type FilmsDataType= ListDataType<"films",FilmDataType>

export type SessionDataType=ReturnedDataFromModelType<SessionModelType>
export type SessionsDataType= ListDataType<"sessions",SessionDataType>

export type HallDataType=ReturnedDataFromModelType<HallModelType>
export type HallsDataType= ListDataType<"halls",HallDataType>

export type TicketDataType=ReturnedDataFromModelType<TicketModelType>
export type TicketsDataType= ListDataType<"tickets",TicketDataType>
    
export type UserDataType=ReturnedDataFromModelType<UserModelType>
export type UsersDataType= ListDataType<"users",UserDataType>

export type OrderDataType=ReturnedDataFromModelType<OrderModelType>
export type OrdersDataType= ListDataType<"orders",OrderDataType>

export type ReserveDataType=ReturnedDataFromModelType<ReserveModelType>
export type ReservesDataType= ListDataType<"reserves",ReserveDataType>

export type TockenDataType=ReturnedDataFromModelType<TockenModelType>
export type AbbreviatedTockenDataType={
    user:Types.ObjectId
    refreshToken:string
}
export type GeneratedTockensDataType={
    accessTocken:string
    refreshTocken:string
}
export type RefreshTockenDataType=GeneratedTockensDataType&{userId:string}


export type UpdatedCinemaDataType=RemovedCreateAtType<CinemaDataType>
export type UpdateFilmDataType=RemovedCreateAtType<FilmDataType>
export type UpdateSessionDataType=RemovedCreateAtType<SessionDataType>
export type UpdatedHallDataType=RemovedCreateAtType<HallDataType>
export type UpdatedTicketDataType=RemovedCreateAtType<TicketDataType>
export type UpdateUserDataType=ReturnedDataFromModelType<{name:UserNameModelType,updatedAt:Date}>
export type UpdateOrderReserveDataType=ReturnedDataFromModelType<{count:number,status:'active'|'cancelled',updatedAt:Date}>






export type UserArgServiceType={
    _id: Types.ObjectId
    name:string
    email:string
} 