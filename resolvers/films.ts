import { authenticate } from "@/middlewares"
import { filmService } from "@/services"
import { InputArgMutationType,IdArgType,ListQueryArgType, FilmsFilterType, InputUpdateFilmType, InputCreateFilmType } from "@/types"

const filmsQueries = {
    getFilms:async(_:any,{offset,count,filter}:ListQueryArgType&FilmsFilterType)=>{
        const films=await filmService.getFilms({offset,count,filter})
        return films
    },
    getFilm:async(_:any,{id}:IdArgType)=>{
        const film=await filmService.getFilm({id})
        return film
    }
}

const filmsMutations = {
    createFilm:async(_:any,{input}:InputArgMutationType<InputCreateFilmType>,context:any)=>{
        await authenticate(context.tocken)

        const film=await filmService.createFilm(input)
        return film
    },
    updateFilm:async(_:any,{id,input}:InputArgMutationType<InputUpdateFilmType>,context:any)=>{
        await authenticate(context.tocken)

        const film=await filmService.updateFilm(id!,input)
        return film
    },
    deleteFilm:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const film=await filmService.deleteFilm({id})
        return film
    }

}

export {
    filmsQueries,
    filmsMutations
}