import {Types} from "mongoose"
import { CinemaModelType, FilmModelType, HallModelType, OrderModelType, ReserveModelType, SessionModelType, TicketModelType, TimestampsType, TockenModelType, UserModelType, UserNameModelType, } from "./models"

type RemovedCreateAtType<T>=Omit<T,'createdAt'>

type ReturnedDataFromModelType<T>={
    _id:Types.ObjectId
}&T

type ListDataType<T extends string,U>={
    offset:number
    count:number
}&Record<T,Array<U>>

export type CinemaDataType=ReturnedDataFromModelType<CinemaModelType>
export type GetCinemaDataType=ReturnedDataFromModelType<{
    title: string;
    city: string;
    street: string;
    rating: number;
    films: Array<FilmDataType>;
    halls: Array<HallDataType>;
    sessions: Array<SessionModelType>
}& TimestampsType>
export type CinemasDataType= ListDataType<"cinemas",GetCinemaDataType>

export type FilmDataType=ReturnedDataFromModelType<FilmModelType>
export type FilmsDataType= ListDataType<"films",FilmDataType>

export type SessionDataType=ReturnedDataFromModelType<SessionModelType>
export type GetSessionDataType=ReturnedDataFromModelType<{
    timeline:string
    date:Date
    ticket:TicketDataType
    film:FilmDataType
    halls:Array<HallDataType>
    }& TimestampsType>
export type SessionsDataType= ListDataType<"sessions",GetSessionDataType>

export type HallDataType=ReturnedDataFromModelType<HallModelType>
export type HallsDataType= ListDataType<"halls",HallDataType>

export type TicketDataType=ReturnedDataFromModelType<TicketModelType>
export type TicketsDataType= ListDataType<"tickets",TicketDataType>
    
export type UserDataType=ReturnedDataFromModelType<UserModelType>
export type GetUserDataType=ReturnedDataFromModelType<{
    name: UserNameModelType;
    history: Array<Omit<GetOrderDataType,"user">>;
    reserve: Array<Omit<GetReserveDataType,"user">>;
    email: string;
    password: string;
}& TimestampsType>
export type CreateUserDataType=ReturnedDataFromModelType<{
    name: UserNameModelType;
    history: [];
    reserve: []
    email: string;
    password: string;
}& TimestampsType>
export type UsersDataType= ListDataType<"users",GetUserDataType>

export type OrderDataType=ReturnedDataFromModelType<OrderModelType>
export type GetOrderDataType=ReturnedDataFromModelType<{
    user: UserDataType;
    session: GetSessionDataType;
    places: Array<number>;
    payment_status: boolean;
    payment_id: string;
    status: 'active' | 'cancelled';
} & TimestampsType>

export type OrdersDataType= ListDataType<"orders",GetOrderDataType>

export type ReserveDataType=ReturnedDataFromModelType<ReserveModelType>
export type GetReserveDataType=ReturnedDataFromModelType<{
    user: UserDataType;
    session: GetSessionDataType;
    places: Array<number>;
    status: 'active' | 'cancelled'
}& TimestampsType>
export type ReservesDataType= ListDataType<"reserves",GetReserveDataType>

export type TockenDataType=ReturnedDataFromModelType<TockenModelType>
export type TockensDataType=ListDataType<"tockens",TockenDataType>

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
export type UpdateUserDataType=ReturnedDataFromModelType<{name:UserNameModelType,updatedAt:Date,history:Array<string>,reserve:Array<string>}>
export type UpdateOrderReserveDataType=ReturnedDataFromModelType<{places:Array<number>,status:'active'|'cancelled',updatedAt:Date}>


export type UserArgServiceType={
    _id: Types.ObjectId
    name:string
    email:string
} 