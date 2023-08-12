import { CreateInputHallType, HallDataType, HallsDataType, HallsFilterType, IdArgType, ListQueryArgType, UpdateInputHallType, UpdatedHallDataType,} from "@/types";
import {hallModel } from "@/models";
import { Types } from "mongoose";

class Hall {
    private static instance:Hall|null=null

    constructor(){
        if(Hall.instance) return Hall.instance
        else Hall.instance=this
    }

    public async getHalls({offset,count,filter}:ListQueryArgType&HallsFilterType):Promise<HallsDataType>{
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
    public async getHall({id}:IdArgType):Promise<HallDataType>{
        const hall=await hallModel.findById(id)
        return hall
    }
    public async createHall(input:CreateInputHallType):Promise<HallDataType>{
        const hall=await hallModel.create(input)
        return hall
    }
    public async updateHall(id:string,input:UpdateInputHallType):Promise<UpdatedHallDataType>{
        await hallModel.updateOne({_id:id},input)
            
        const hall= await hallModel.findById(id)
            .select('-createdAt')
            .lean()

        return hall as UpdatedHallDataType
    }

    public async reservePlaces(id:Types.ObjectId,places:Array<number>):Promise<boolean>{
        const prevHall=await hallModel.findById(id).select('reserve -_id')

        const newPlaces=[
            ...prevHall.reserve,
            ...places
        ].sort((a,b)=>a-b)
        
        await hallModel.updateOne({_id:id},{reserve:newPlaces})

        return true
    }

    public async orderPlaces(id:Types.ObjectId,places:Array<number>):Promise<boolean>{
        const prevHall=await hallModel.findById(id).select('busy')

        const newPlaces=[
            ...prevHall.busy,
            ...places
        ].sort((a,b)=>a-b)
        
        await hallModel.updateOne({_id:id},{busy:newPlaces})

        return true
    }

    public async cancelOrderPlaces(id:Types.ObjectId,places:Array<number>):Promise<boolean>{
        const prevHall=await hallModel.findById(id).select('busy')

        let newPlaces:Array<number>=[...prevHall.busy]

        for(let place of places){
            const index=newPlaces.indexOf(place)
            newPlaces.splice(index,1)
        }
        await hallModel.updateOne({_id:id},{busy:newPlaces})

        return true
    }

    public async cancelReservePlaces(id:Types.ObjectId,places:Array<number>):Promise<boolean>{
        const prevHall=await hallModel.findById(id).select('reserve')

        let newPlaces:Array<number>=[...prevHall.reserve]

        for(let place of places){
            const index=newPlaces.indexOf(place)
            newPlaces.splice(index,1)
        }
        await hallModel.updateOne({_id:id},{reserve:newPlaces})

        return true
    }

    public async deleteHall({id}:IdArgType):Promise<HallDataType>{
        const hall=await hallModel.findByIdAndDelete(id)
        return hall
    }
}

export const hallService = new Hall()