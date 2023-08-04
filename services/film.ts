import { IdArgType, ListQueryArgType,InputFilmType, UpdateFilmDataType, FilmDataType } from "@/types";
import { filmModel} from "@/models";

class Film {
    async getFilms({offset,count}:ListQueryArgType):Promise<FilmDataType>{}
    async getFilm({id}:IdArgType):Promise<FilmDataType>{}
    async createFilm(input:InputFilmType):Promise<FilmDataType>{}
    async updateFilm(input:InputFilmType):Promise<UpdateFilmDataType>{}
    async deleteFilm({id}:IdArgType):Promise<FilmDataType>{}
}

export const filmService = new Film()