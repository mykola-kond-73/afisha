import {Types} from "mongoose"
import { CinemaModelType, FilmModelType, HallModelType, OrderModelType, ReserveModelType, SessionModelType, TicketModelType, TockenModelType, UserModelType, UserNameModelType, } from "./models"

type RemovedCreateAtType<T>=Omit<T,'createdAt'>

type ReturnedDataFromModelType<T>={
    _id:Types.ObjectId
}&T

export type CinemaDataType=ReturnedDataFromModelType<CinemaModelType>
export type FilmDataType=ReturnedDataFromModelType<FilmModelType>
export type SessionDataType=ReturnedDataFromModelType<SessionModelType>
export type HallDataType=ReturnedDataFromModelType<HallModelType>
export type TicketDataType=ReturnedDataFromModelType<TicketModelType>
export type UserDataType=ReturnedDataFromModelType<UserModelType>
export type OrderDataType=ReturnedDataFromModelType<OrderModelType>
export type ReserveDataType=ReturnedDataFromModelType<ReserveModelType>
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