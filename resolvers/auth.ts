import { authenticate } from "@/middlewares"
import { authService } from "@/services"
import {InputArgMutationType,InputLoginType,InputRefreshType} from "@/types"

const authMutations = {
    login:async (_:any,{input}:InputArgMutationType<InputLoginType>)=>{
        const login=await authService.login(input)
        return login
    },
    logout:async(_:any,{refreshToken}:InputRefreshType,context:any)=>{
        await authenticate(context.tocken)

        const logout=await authService.logout(refreshToken)
        return logout
    },
    refresh:async(_:any,{refreshToken}:InputRefreshType,context:any)=>{
        await authenticate(context.tocken)

        const refresh=await authService.refresh(refreshToken)
        return refresh
    }
}

export {
    authMutations
}