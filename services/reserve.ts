import { CreateInputReserveType, GetReserveDataType, IdArgType, ListQueryArgType, ReserveDataType, ReserveFilterType, ReservesDataType, UpdateInputOrderReserveType, UpdateOrderReserveDataType } from "@/types";
import { reserveModel } from "@/models";

class Reserve {
    async getReserves({ offset, count, filter }: ListQueryArgType & ReserveFilterType): Promise<ReservesDataType> {
        let search = {}
        if (filter?.user) search = { ...search, "user._id": filter.user }
        if (filter?.place) search = { ...search, places: { $in: [filter.place] } }
        if (filter?.session) search = { ...search, "session._id": filter.session }
        if (filter?.status) search = { ...search, status: filter.status }

        const reserves: GetReserveDataType[] = await reserveModel.find(search)
            .skip(offset)
            .limit(count)
            .populate([
                {
                    path: "session",
                    populate: [
                        { path: "ticket" },
                        { path: "halls" },
                        { path: "film" }
                    ]
                },
                {
                    path: "user",
                    select: "-password -history -reserve"
                },

            ])
            .lean()

        return {
            reserves,
            offset,
            count: reserves.length
        }
    }
    async getReserve({ id }: IdArgType): Promise<GetReserveDataType> {
        const reserve = await reserveModel.findById(id)
            .populate([
                {
                    path: "session",
                    populate: [
                        { path: "ticket" },
                        { path: "halls" },
                        { path: "film" }
                    ]
                },
                {
                    path: "user",
                    select: "-password -history -reserve"
                },

            ])
            .lean()
        return reserve as GetReserveDataType
    }
    async createReserve(input: CreateInputReserveType): Promise<GetReserveDataType> {
        const reserve = await reserveModel.create(input)
        const reserveResult = await this.getReserve({id:reserve._id})
        return reserveResult 
    }
    async updateReserve(id: string, input: UpdateInputOrderReserveType): Promise<UpdateOrderReserveDataType> {
        await reserveModel.updateOne({ _id: id }, input)

        const ticket = await reserveModel.findById(id)
            .select('-createdAt -user -session')
            .lean()

        return ticket as UpdateOrderReserveDataType
    }
    async deleteReserve({ id }: IdArgType): Promise<ReserveDataType> {
        const reserve = await reserveModel.findByIdAndDelete(id)
        return reserve
    }
}

export const reserveService = new Reserve()