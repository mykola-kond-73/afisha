import { authenticate } from "@/middlewares"
import { cinemaService } from "@/services"
import { InputCinemaType,InputArgMutationType,IdArgType,ListQueryArgType, CinemasFilterType } from "@/types"

const cinemasQueries = {
    getCinemas:async(_:any,{offset,count,filter}:ListQueryArgType&CinemasFilterType)=>{
        const cinemas=await cinemaService.getCinemas({offset,count,filter})
        return cinemas 
    },
    getCinema:async(_:any,{id}:IdArgType)=>{
        const cinema=await cinemaService.getCinema({id})
        return cinema
    }
}

const cinemasMutations = {
    createCinema:async(_:any,{input}:InputArgMutationType<InputCinemaType>,context:any)=>{
        await authenticate(context.tocken)

        const cinema=await cinemaService.createCinema(input)
        return cinema
    },
    updateCinema:async(_:any,{id,input}:InputArgMutationType<Partial<InputCinemaType>>,context:any)=>{
        await authenticate(context.tocken)

        const cinema=await cinemaService.updateCinema(id!,input)
        return cinema
    },
    deleteCinema:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const cinema=await cinemaService.deleteCinema({id})
        return cinema
    }
}

export {
    cinemasMutations,
    cinemasQueries
}