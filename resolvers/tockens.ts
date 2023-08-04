import {IdArgType,ListQueryArgType } from "@/types"

const tockensQueries = {
    getTockens:(_:any,{offset,count}:ListQueryArgType)=>{},
}

const tockensMutations = {
    deleteTocken:(_:any,{id}:IdArgType)=>{}

}

export {
    tockensQueries,
    tockensMutations
}