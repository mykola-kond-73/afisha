import { filmModelType } from "@/types";
import mongoose from "mongoose"

const schema=new mongoose.Schema<filmModelType>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:mongoose.Types.Decimal128,
        required:true
    },
    limitation:{
        type:String,
        enum:['18+','16+','12+','0+'],
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

const filmModel=mongoose.model('films',schema)


export{filmModel}

filmModel.createIndexes()