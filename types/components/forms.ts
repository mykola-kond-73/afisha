
export type LoginFormPropsType={
    isLoadLogin:boolean
    signIn:(email:string,password:string)=>void
}

export type RegisterFormPropsType={
    isLoadRefister:boolean
    register:(data:RegisterDataType)=>void
}

export type OrderReserveFormPropsType={
    type:"order"|"reserve"|""
    isLoadOrder:boolean
    isLoadReserve:boolean
    order:(places:number[])=>void
    reserve:(places:number[])=>void
}

export type FilterFormPropsType={
    isLoad:boolean
    setLoad:{
        on:()=>void
        off:()=>void
        toggle:()=>void
    }
    hideFunc:()=>void
}

export type LoginValuesType={
    email:string
    password:string
}

export type RegisterValuesType={
    firstname:string
    lastname:string
    phone:string
    email:string
    password:string
    repeatPassword:string
}

export type RegisterDataType={
    name:{
        firstname:string
        lastname:string
    }
    phone:string
    email:string
    password:string
}

export type OrderReserveValuesType={
    places:string
}

export type FilterValuesType={
    title:string
    city:string
    street:string
    rating:string
}

export type FormCallbacksType={ setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }