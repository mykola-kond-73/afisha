import { RegisterDataType } from "./forms"

export type LoginModalPropsType={
    show:boolean
    isLoadLogin:boolean
    loginError?:string
    hideFunc:()=>void   
    showFunc:()=>void
    signIn:(email:string,password:string)=>void
}

export type OrderModalPropsType={
    type:"order"|"reserve"|""
    show:boolean
    isLoadOrder:boolean
    isLoadReserve:boolean
    amount:number
    hideFunc:()=>void   
    order:(places:number[],amount:number)=>void
    reserve:(places:number[])=>void
    orderError?:string
    reserveError?:string
}

export type RegisterModalPropsType={
    show:boolean
    isLoadRefister:boolean
    registerError?:string
    hideFunc:()=>void  
    register:(data:RegisterDataType)=>void
}