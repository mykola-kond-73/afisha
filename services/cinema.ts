import { CinemaDataType, CinemaModelType, IdArgType, InputCinemaType, ListQueryArgType, UpdatedCinemaDataType,  } from "@/types";
import { cinemaModel } from "@/models";

class Cinema {
    async getCinemas({offset,count}:ListQueryArgType):Promise<CinemaDataType>{}
    async getCinema({id}:IdArgType):Promise<CinemaDataType>{}
    async createCinema(input:InputCinemaType):Promise<CinemaDataType>{}
    async updateCinema(input:InputCinemaType):Promise<UpdatedCinemaDataType>{}
    async deleteCinema({id}:IdArgType):Promise<CinemaDataType>{}
}

export const cinemaService = new Cinema()