import {  InputFilmType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const filmsQueries = {
    getFilms:(_:any,{offset,count}:ListQueryArgType)=>{},
    getFilm:(_:any,{id}:IdArgType)=>{}
}

const filmsMutations = {
    createFilm:(_:any,{input}:InputArgMutationType<InputFilmType>)=>{},
    updateFilm:(_:any,{input}:InputArgMutationType<InputFilmType>)=>{},
    deleteFilm:(_:any,{id}:IdArgType)=>{}

}

export {
    filmsQueries,
    filmsMutations
}