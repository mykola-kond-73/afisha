import { PaginatorType } from "./cards"

export type BoxContentPropsType={
    title:string
    children:React.ReactNode
}

export type ErrorPropsType={
    code:string
    size:string
}

export type PaginatorPropsType = {
    totalCount: number
}&PaginatorType