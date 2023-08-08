import { CinemaModelType } from '@/types';
import mongoose,{Schema} from 'mongoose'

const schema=new mongoose.Schema<CinemaModelType>({
    title:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    films:{
        type:[Schema.Types.ObjectId],
        ref:'films',
        required:true
    },
    halls:{
        type:[Schema.Types.ObjectId],
        ref:'halls',
        required:true   
    },
    sessions:{
        type:[Schema.Types.ObjectId],
        ref:'sessions',
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

const cinemaModel=mongoose.models.cinemas || mongoose.model('cinemas',schema)


export{cinemaModel}

cinemaModel.createIndexes()