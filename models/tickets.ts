import { TicketModelType } from "@/types";
import mongoose,{ Types} from "mongoose"

const schema=new mongoose.Schema<TicketModelType>({
    cost:{
        type:Types.Decimal128,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: new Date()
    },
    updatedAt:{
        type:Date,
        required:true,
        default: new Date(),
    }
}, {
    versionKey: false,
    autoIndex: false
})

schema.pre('updateOne', function() {
    this.set({ updatedAt: new Date() });
  });

const ticketModel=mongoose.model('tickets',schema)


export{ticketModel}

ticketModel.createIndexes()