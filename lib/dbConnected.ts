import _mongoose,{connect} from 'mongoose'



declare global{
    var mongoose:{
        promise: ReturnType<typeof connect> | null
        conn: typeof _mongoose | null
    }
}

const MONGODB_URI=process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("Pleace define the MONGODB_URI enviroment variable inside .env.local")
}

_mongoose.connection.once("open",()=>{
    console.log(`\nDB connected on uri:${MONGODB_URI}\n`)
})

let cached=global.mongoose

if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

async function dbConnect() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts={
            bufferCommands:true
        }

        cached.promise= connect(MONGODB_URI!,opts).then(mongoose=>mongoose)
    }

    try{
        cached.conn=await cached.promise
    }catch(error){
        cached.promise=null
        throw error
    }

    return cached.conn
}

export default dbConnect