import { ticketService } from "@/services"
import { InputArgMutationType, IdArgType, ListQueryArgType, InputTicketType, TicketsFilterType } from "@/types"

const ticketsQueries = {
    getTickets: async(_: any, { offset, count,filter }: ListQueryArgType&TicketsFilterType) => {
        const tickets=await ticketService.getTickets({offset,count,filter})
        return tickets
     },
    getTicket: async(_: any, { id }: IdArgType) => { 
        const ticket=await ticketService.getTicket({id})
        return ticket
    }
}

const ticketsMutations = {
    createTicket: async (_: any, { input }: InputArgMutationType<InputTicketType>) => {
        const ticket = await ticketService.createTicket(input)
        return ticket
    },
    updateTicket: async(_: any, { input,id }: InputArgMutationType<InputTicketType>) => {
        const ticket=await ticketService.updateTicket(id!,input)
        return ticket
    },
    deleteTicket: async(_: any, { id }: IdArgType) => {
        const ticket=await ticketService.deleteTicket({id})
        return ticket
    }
}

export {
    ticketsQueries,
    ticketsMutations
}