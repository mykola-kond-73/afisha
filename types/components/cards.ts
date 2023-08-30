import { OrderModalPropsType } from ".."

export type FilmCardPropsType = {
    _id: string
    title: string
    description: string
    rating: number
    limitation: string
    photo: string
}

export type HallCardPropsType = {
    _id:string
    title: string
    places: string
    busy: string[]
    reserve: string[]
}

export type SessionCardPropsType = {
    _id: string
    timeline: string
    date: string
    ticket: {
        _id: string
        cost: string
    }
    film: FilmCardPropsType
    hall?: HallCardPropsType
    noHalls: boolean
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
    history: Array<HistoryType>
    reserve: Array<ReserveType>
}

export type PersonalDataCardPropsType = {
    data: PersonalDataCardType
    delUserFunc:(userId:string)=>Promise<void>
    cancelFunc:(id:string,type:"order"|"reserve",hallId:string)=>Promise<void>
    loadOrder:boolean
    loadReserve:boolean
    loadDelUser:boolean
}

export type ActionCardPropsType = {
    showModal: (type: "order" | "reserve") => void
} & OrderModalPropsType

export type ActionCardContainerPropsType = {
    sessionId: string
}

export type HistoryType = {
    _id: string
    session: SessionCardPropsType
    places: number[]
    payment_status: string
    payment_id: string
    status: string
}

export type ReserveType = {
    _id: string
    session: SessionCardPropsType
    places: number[]
    status: string
}

export type ActionsPersonalDataCardPropsType = {
    firstBut: {
        value: string
        callback: () => void
        isLoad:boolean
    }
}