import { OrderModelType } from "@/types";
import mongoose,{ Schema} from "mongoose"

const schema=new mongoose.Schema<OrderModelType>({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    session:{
        type:Schema.Types.ObjectId,
        ref:'sessions',
        required:true
    },
    places:{
        type:[Number],
        required:true
    },
    payment_status:{
        type:Boolean,
        required:true
    },
    payment_id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active','cancelled'],
        required:true,
        default:"active"
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

const orderModel=mongoose.models.orders || mongoose.model('orders',schema)


export{orderModel}

orderModel.createIndexes()