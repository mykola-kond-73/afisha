import { SessionModelType } from "@/types";
import mongoose,{Schema} from "mongoose"

const schema=new mongoose.Schema<SessionModelType>({
    timeline:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    ticket:{
        type:Schema.Types.ObjectId,
        ref:'tickets',
        required:true
    },
    film:{
        type:Schema.Types.ObjectId,
        ref:'films',
        required:true
    },
    hall:{
        type:Schema.Types.ObjectId,
        ref:'halls',
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


const sessionModel=mongoose.models.sessions || mongoose.model('sessions',schema)


export{sessionModel}

sessionModel.createIndexes()