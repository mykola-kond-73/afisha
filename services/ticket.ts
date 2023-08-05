import {  IdArgType,ListQueryArgType, TicketDataType, UpdatedTicketDataType, TicketsDataType, InputTicketType, TicketsFilterType} from "@/types";
import { ticketModel} from "@/models";

class Ticket {
    async getTickets({offset,count,filter}:ListQueryArgType&TicketsFilterType):Promise<TicketsDataType>{
        let search={}
        if(filter?.range){
            const [from,to]=filter.range.split('-')
            search={ cost: { $gte: from, $lte: to } }
        }

        const tickets:TicketDataType[]=await ticketModel.find(search)
            .skip(offset)
            .limit(count)
            .lean()

        return {
            tickets,
            offset,
            count:tickets.length
        }
    }
    async getTicket({id}:IdArgType):Promise<TicketDataType>{
        const ticket= await ticketModel.findById(id)
        return ticket
    }
    async createTicket(input:InputTicketType):Promise<TicketDataType>{
        const ticket=await ticketModel.create(input)
        return ticket
    }
    async updateTicket(id:string,input:InputTicketType):Promise<UpdatedTicketDataType>{
        await ticketModel.updateOne({_id:id},{cost:input.cost})
            
        const ticket= await ticketModel.findById(id)
            .select('-createdAt')
            .lean()

        return ticket as UpdatedTicketDataType
    }
    async deleteTicket({id}:IdArgType):Promise<TicketDataType>{
        const ticket=await ticketModel.findByIdAndDelete(id)
        return ticket
    }
}

export const ticketService = new Ticket()