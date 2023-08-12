import { CinemaDataType, CinemaModelType, CinemasDataType, CinemasFilterType, GetCinemaDataType, IdArgType, InputCinemaType, ListQueryArgType, UpdatedCinemaDataType, } from "@/types";
import { cinemaModel } from "@/models";


class Cinema {
    private static instance:Cinema|null=null

    constructor(){
        if(Cinema.instance) return Cinema.instance
        else Cinema.instance=this
    }

    async getCinemas({ offset, count, filter }: ListQueryArgType & CinemasFilterType): Promise<CinemasDataType> {
        let search = {}
        if (filter?.rating) {
            const [from, to] = filter.rating.split('-')
            search = { ...search, rating: { $gte: from, $lte: to } }
        }
        if (filter?.film) search = { ...search, films:{$in:[ filter.film]}}
        if (filter?.session) search = { ...search, sessions:{$in:[filter.session]}}
        if (filter?.title) search = { ...search, title: filter.title }
        if (filter?.city) search = { ...search, city: filter.city }
        if (filter?.street) search = { ...search, street: filter.street }

        const cinemas: GetCinemaDataType[] = await cinemaModel.find(search)
            .skip(offset)
            .limit(count)
            .populate([
                {
                    path: "sessions",
                    populate: [
                        { path: "ticket" },
                        { path: "halls" },
                        { path: "film" }
                    ]
                },
                { path: "halls" },
                { path: "films" },

            ])
            .lean()

        return {
            cinemas,
            offset,
            count: cinemas.length
        }
    }
    async getCinema({ id }: IdArgType): Promise<GetCinemaDataType> {
        const cinema = await cinemaModel.findById(id)
            .populate([
                {
                    path: "sessions",
                    populate: [
                        { path: "ticket" },
                        { path: "halls" },
                        { path: "film" }
                    ]
                },
                { path: "halls" },
                { path: "films" },

            ])
            .lean()
        return cinema as GetCinemaDataType
    }
    async createCinema(input: InputCinemaType): Promise<CinemaDataType> {
        const cinema = await cinemaModel.create(input)
        return cinema
    }
    async updateCinema(id: string, input: Partial<InputCinemaType>): Promise<UpdatedCinemaDataType> {
        await cinemaModel.updateOne({ _id: id }, input)

        const hall = await cinemaModel.findById(id)
            .select('-createdAt')
            .populate([
                {path:"sessions",
                populate:[
                    {path:"ticket"},
                    {path:"halls"},
                    {path:"film"}    
                ]
                },
                {path:"halls"},
                {path:"films"},

            ])
            .lean()

        return hall as UpdatedCinemaDataType
    }
    async deleteCinema({ id }: IdArgType): Promise<CinemaDataType> {
        const cinema = await cinemaModel.findByIdAndDelete(id)
        return cinema
    }
}

export const cinemaService = new Cinema()