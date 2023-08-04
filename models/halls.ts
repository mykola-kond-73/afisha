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
        required:true
    },
    reserve:{
        type:[Number],
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

const hallModel=mongoose.model('halls',schema)


export{hallModel}

hallModel.createIndexes()