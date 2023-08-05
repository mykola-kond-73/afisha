import { UserModelType, UserNameModelType } from "@/types";
import mongoose,{ Schema} from "mongoose"

const nameSchema=new mongoose.Schema<UserNameModelType>({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }
},{
    versionKey:false,
    autoIndex:false,
    _id:false 
})

const schema=new mongoose.Schema<UserModelType>({
    name:{
        type:nameSchema,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    history:{
        type:[Schema.Types.ObjectId],
        ref:'orders',
        required:true
    },
    reserve:{
        type:[Schema.Types.ObjectId],
        ref:'reserves',
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

const userModel=mongoose.models.users || mongoose.model('users',schema)


export{userModel}

userModel.createIndexes()