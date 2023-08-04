import { InputTicketType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const ticketsQueries = {
    getTickets:(_:any,{offset,count}:ListQueryArgType)=>{},
    getTicket:(_:any,{id}:IdArgType)=>{}
}

const ticketsMutations = {
    createTicket:(_:any,{input}:InputArgMutationType<InputTicketType>)=>{},
    updateTicket:(_:any,{input}:InputArgMutationType<InputTicketType>)=>{},
    deleteTicket:(_:any,{id}:IdArgType)=>{}

}

export {
    ticketsQueries,
    ticketsMutations
}