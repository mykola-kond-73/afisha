import { IdArgType, ListQueryArgType, UpdateFilmDataType, FilmDataType, FilmsFilterType, FilmsDataType, InputUpdateFilmType, InputCreateFilmType } from "@/types";
import { filmModel} from "@/models";

class Film {
    async getFilms({offset,count,filter}:ListQueryArgType&FilmsFilterType):Promise<FilmsDataType>{
        let search={}
        if(filter?.rating){
            const [from,to]=filter.rating.split('-')
            search={ rating: { $gte: from, $lte: to } }
        }
        if(filter?.limitation) search={...search,limitation:filter.limitation}
        if(filter?.title) search={...search,title:filter.title}


        const films:FilmDataType[]=await filmModel.find(search)
        .skip(offset)
        .limit(count)
        .lean()

        return {
            films,
            offset,
            count:films.length
        }
    }
    async getFilm({id}:IdArgType):Promise<FilmDataType>{
        const film=await filmModel.findById(id)
        return film
    }
    async createFilm(input:InputCreateFilmType):Promise<FilmDataType>{
        const film=await filmModel.create(input)
        return film
    }
    async updateFilm(id:string,input:InputUpdateFilmType):Promise<UpdateFilmDataType>{
        await filmModel.updateOne({_id:id},{...input})
        const film= await filmModel.findById(id)
            .select('-createdAt')
            .lean()
        return film as UpdateFilmDataType
    }
    async deleteFilm({id}:IdArgType):Promise<FilmDataType>{
        const film=await filmModel.findByIdAndDelete(id)
        return film
    }
}

export const filmService = new Film()