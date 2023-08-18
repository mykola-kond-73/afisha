'use client'

import { GET_CINEMA } from "@/API"
import { useQuery } from "@apollo/client"

export const dynamic = "force-dynamic"

const Cinema=({params}:ParamsType)=>{
    // const {data,loading,error}=useQuery(GET_CINEMA,{
    //     variables:{
    //         getCinemaId:params.id
    //     }
    // })

    return (
        <div>
            {params.id}
        </div>
    )
}

type ParamsType={
    params:{id:string}
}

export default Cinema