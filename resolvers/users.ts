import {CreateInputUserType,UpdateInputUserType,InputArgMutationType,IdArgType,ListQueryArgType } from "@/types"

const usersQueries = {
    getUsers:(_:any,{offset,count}:ListQueryArgType)=>{},
    getUser:(_:any,{id}:IdArgType)=>{}
}

const usersMutations = {
    createUser:(_:any,{input}:InputArgMutationType<CreateInputUserType>)=>{},
    updateUser:(_:any,{input}:InputArgMutationType<UpdateInputUserType>)=>{},
    deleteUser:(_:any,{id}:IdArgType)=>{}

}

export {
    usersQueries,
    usersMutations
}