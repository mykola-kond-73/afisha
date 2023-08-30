import { CancelOrderReserveDataType, CreateInputReserveType, GetReserveDataType, IdArgType, ListQueryArgType, ReserveDataType, ReserveFilterType, ReservesDataType, UpdateInputOrderReserveType, UpdateOrderReserveDataType } from "@/types";
import { reserveModel, tockenModel, userModel } from "@/models";
import { hallService, sessionService } from ".";
import { filterPlaces } from "@/utils/servicesUtils";

class Reserve {
    private static instance:Reserve|null=null

    constructor(){
        if(Reserve.instance) return Reserve.instance
        else Reserve.instance=this
    }

    async getCountDocuments():Promise<number>{
        const count=await tockenModel.countDocuments()
        return count
    }

    async getReserves({ offset, count, filter }: ListQueryArgType & ReserveFilterType): Promise<ReservesDataType> {
        let search = {}
        if (filter?.user) search = { ...search, user: filter.user }
        if (filter?.place) search = { ...search, places: { $in: [filter.place] } }
        if (filter?.session) search = { ...search, session: filter.session }
        if (filter?.status) search = { ...search, status: filter.status }

        const reserves: GetReserveDataType[] = await reserveModel.find(search)
            .skip(offset)
            .limit(count)
            .populate([
                {
                    path: "session",
                    populate: [
                        { path: "ticket" },
                        { path: "hall" },
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
                        { path: "hall" },
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
        const hall = (await sessionService.getSession({ id: input.session })).hall

        filterPlaces(hall,input.places)

        await hallService.reservePlaces(hall._id,input.places)

        const reserve = await reserveModel.create(input)
        await userModel.findOneAndUpdate({_id:input.user},{ $addToSet:{reserve:reserve._id}})
        const reserveResult=await this.getReserve({id:reserve._id})

        return reserveResult
    }
    async updateReserve(id: string, input: UpdateInputOrderReserveType): Promise<UpdateOrderReserveDataType> {
        await reserveModel.updateOne({ _id: id }, input)

        const ticket = await reserveModel.findById(id)
            .select('-createdAt -user -session -status')
            .lean()

        return ticket as UpdateOrderReserveDataType
    }

    async cancelReserve(id:string):Promise<CancelOrderReserveDataType>{
        const reservePlaces=(await this.getReserve({id})).places
        const hall=(await this.getReserve({id})).session.hall

        await hallService.cancelReservePlaces(hall._id,reservePlaces)

        await reserveModel.updateOne({ _id: id },{status:"cancelled"})

        const order = await reserveModel.findById(id,{updatedAt:1,status:1,places:1})

        return order as CancelOrderReserveDataType
    }

    async deleteReserve({ id }: IdArgType): Promise<ReserveDataType> {
        const reserve = await reserveModel.findByIdAndDelete(id)
        return reserve
    }
}

export const reserveService = new Reserve()