import {  IdArgType, InputTicketType, ListQueryArgType, UpdatedTicketDataType} from "@/types";
import { ticketModel} from "@/models";

class Ticket {
    async getTickets({offset,count}:ListQueryArgType):Promise<TicketDataType>{}
    async getTicket({id}:IdArgType):Promise<TicketDataType>{}
    async createTicket(input:InputTicketType):Promise<TicketDataType>{}
    async updateTicket(input:InputTicketType):Promise<UpdatedTicketDataType>{}
    async deleteTicket({id}:IdArgType):Promise<TicketDataType>{}
}

export const ticketService = new Ticket()