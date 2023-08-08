import { tockenService } from "@/services"
import {IdArgType,ListQueryArgType, TockenFilterType } from "@/types"

const tockensQueries = {
    getTockens:async(_:any,{offset,count,filter}:ListQueryArgType&TockenFilterType)=>{
        const tockens=await tockenService.getTockens({offset,count,filter})
        return tockens 
    },
}

const tockensMutations = {
    deleteTocken:async(_:any,{id}:IdArgType)=>{
        const tocken=await tockenService.deleteTocken({id})
        return tocken
    }

}

export {
    tockensQueries,
    tockensMutations
}