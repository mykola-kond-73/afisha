import { authenticate } from "@/middlewares"
import { userService } from "@/services"
import {CreateInputUserType,UpdateInputUserType,InputArgMutationType,IdArgType,ListQueryArgType, UserFilterType } from "@/types"

const usersQueries = {
    getUsers:async(_:any,{offset,count,filter}:ListQueryArgType&UserFilterType,context:any)=>{
        await authenticate(context.tocken)

        const users=await userService.getUsers({offset,count,filter})
        return users
    },
    getUser:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)
        
        const user=await userService.getUser({id})
        return user
    }
}

const usersMutations = {
    createUser:async(_:any,{input}:InputArgMutationType<CreateInputUserType>,context:any)=>{
        await authenticate(context.tocken)
        
        const user=await userService.createUser(input)
        return user
    },
    updateUser:async(_:any,{id,input}:InputArgMutationType<UpdateInputUserType>,context:any)=>{
        await authenticate(context.tocken)

        const user=await userService.updateUser(id!,input)
        return user
    },
    deleteUser:async(_:any,{id}:IdArgType,context:any)=>{
        await authenticate(context.tocken)

        const user=await userService.deleteUser({id})
        return user
    }

}

export {
    usersQueries,
    usersMutations
}