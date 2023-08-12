import { authService } from "@/services"
import {InputArgMutationType,InputLoginType,InputRefreshType} from "@/types"

const authMutations = {
    login:async (_:any,{input}:InputArgMutationType<InputLoginType>)=>{
        const login=await authService.login(input)
        return login
    },
    logout:async(_:any,{refreshToken}:InputRefreshType)=>{
        const logout=await authService.logout(refreshToken)
        return logout
    },
    refresh:async(_:any,{refreshToken}:InputRefreshType)=>{
        const refresh=await authService.refresh(refreshToken)
        return refresh
    }
}

export {
    authMutations
}