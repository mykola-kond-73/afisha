import {InputArgMutationType,InputLoginType,InputRefreshType} from "@/types"

const authMutations = {
    login:(_:any,{input}:InputArgMutationType<InputLoginType>)=>{},
    logout:(_:any,{refreshToken}:InputRefreshType)=>{},
    refresh:(_:any,{refreshToken}:InputRefreshType)=>{}
}

export {
    authMutations
}