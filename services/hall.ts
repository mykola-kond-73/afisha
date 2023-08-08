import { CreateInputHallType, HallDataType, HallsDataType, HallsFilterType, IdArgType, ListQueryArgType, UpdateInputHallType, UpdatedHallDataType,} from "@/types";
import {hallModel } from "@/models";

class Hall {
    async getHalls({offset,count,filter}:ListQueryArgType&HallsFilterType):Promise<HallsDataType>{
        let search={}
        if(filter?.places){
            const [from,to]=filter.places.split('-')
            search={ places: { $gte: from, $lte: to } }
        }
        if(filter?.title) search={...search,title:filter.title}

        const halls:HallDataType[]=await hallModel.find(search)
            .skip(offset)
            .limit(count)
            .lean()

        return {
            halls,
            offset,
            count:halls.length
        }
    }
    async getHall({id}:IdArgType):Promise<HallDataType>{
        const hall=await hallModel.findById(id)
        return hall
    }
    async createHall(input:CreateInputHallType):Promise<HallDataType>{
        const hall=await hallModel.create(input)
        return hall
    }
    async updateHall(id:string,input:UpdateInputHallType):Promise<UpdatedHallDataType>{
        await hallModel.updateOne({_id:id},input)
            
        const hall= await hallModel.findById(id)
            .select('-createdAt')
            .lean()

        return hall as UpdatedHallDataType
    }
    async deleteHall({id}:IdArgType):Promise<HallDataType>{
        const hall=await hallModel.findByIdAndDelete(id)
        return hall
    }
}

export const hallService = new Hall()