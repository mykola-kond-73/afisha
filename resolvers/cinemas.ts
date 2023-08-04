import { InputCinemaType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const cinemasQueries = {
    getCinemas:(_:any,{offset,count}:ListQueryArgType)=>{},
    getCinema:(_:any,{id}:IdArgType)=>{}
}

const cinemasMutations = {
    createCinema:(_:any,{input}:InputArgMutationType<InputCinemaType>)=>{},
    updateCinema:(_:any,{input}:InputArgMutationType<InputCinemaType>)=>{},
    deleteCinema:(_:any,{id}:IdArgType)=>{}
}

export {
    cinemasMutations,
    cinemasQueries
}