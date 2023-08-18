import { FilmModelType } from "@/types";
import mongoose from "mongoose"

const schema=new mongoose.Schema<FilmModelType>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
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

const filmModel=mongoose.models.films || mongoose.model('films',schema)


export{filmModel}

filmModel.createIndexes()