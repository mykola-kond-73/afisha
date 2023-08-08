import { HallModelType } from "@/types";
import mongoose from "mongoose"

const schema=new mongoose.Schema<HallModelType>({
    title:{
        type:String,
        required:true
    },
    places:{
        type:Number,
        required:true
    },
    busy:{
        type:[Number],
        required:true,
        default:[]
    },
    reserve:{
        type:[Number],
        required:true,
        default:[]
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


const hallModel=mongoose.models.halls || mongoose.model('halls',schema)


export{hallModel}

hallModel.createIndexes()