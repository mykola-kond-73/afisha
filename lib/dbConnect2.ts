import { MONGODB_URI } from '@/utils/env'
import mongoose,{connect} from 'mongoose'

export class DB{
    private static instance:DB|null=null
    private connectObj:any|null=null

    constructor(){
        mongoose.connection.on("open",()=>{
            console.log(`\nDB connected on uri:${MONGODB_URI}\n`)
        })

        if(DB.instance) return DB.instance
        else{
            DB.instance=this
        } 
    }

    async connect(){
        try{
            if(!MONGODB_URI){
                throw new Error("Pleace define the MONGODB_URI enviroment variable inside .env.local")
            }

            const opts={
                bufferCommands:true
            }
            if(!this.connectObj) this.connectObj=await connect(MONGODB_URI!,opts).then(mongoose=>mongoose)
            
    
            return this.connectObj
        }catch(error){
            throw error
        }
    }
}