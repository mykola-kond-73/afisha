import { AuthTockenDataType, InputLoginType, UserArgServiceType, UserDataType } from "@/types";
import { tockenService, userService } from ".";
import { cryptoService } from "./crypto";
import { GraphQLError } from "graphql";

class Auth{
    private static instance:Auth|null=null

    constructor(){
        if(Auth.instance) return Auth.instance
        else Auth.instance=this
    }

    async login(input:InputLoginType):Promise<AuthTockenDataType>{
        const user:UserDataType=await userService.getUserByEmail({email:input.email})
        const isValidPassword=await cryptoService.checkForCorrectPassword(user.password,input.password)
        
        if(!isValidPassword) throw new GraphQLError("invalid password or email", {
            extensions: {
                code: "UNAUTHENTICATED"
            }
        })
        const generateTockensUserData={
            _id:user._id,
            email:user.email,
            name:user.name.firstname + user.name.lastname
        }
        const tockens=await tockenService.generateTokens(generateTockensUserData)

        await tockenService.saveToken(user._id,tockens.refreshToken)
        return {
            user:user._id,
            ...tockens
        }

    }
    async logout(tocken:string):Promise<boolean>{
        const userDataFromTocken:UserArgServiceType|null=await tockenService.validateRefreshToken(tocken)
        if(!userDataFromTocken) throw new GraphQLError("invalid tocken", {
            extensions: {
                code: "UNAUTHENTICATED"
            }
        })
        const tockenData=await tockenService.findTokenByUserId(userDataFromTocken._id)
        await tockenService.deleteTocken({id:tockenData._id})

        return true
    }
    async refresh(tocken:string):Promise<AuthTockenDataType>{
        const userDataFromTocken:UserArgServiceType|null=await tockenService.validateRefreshToken(tocken)
        if(!userDataFromTocken) throw new GraphQLError("invalid tocken", {
            extensions: {
                code: "UNAUTHENTICATED"
            }
        })

        const tockenData=await tockenService.findTokenByUserId(userDataFromTocken._id)
        if(!tockenData)throw new GraphQLError("invalid tocken", {
            extensions: {
                code: "UNAUTHENTICATED"
            }
        })

        const generateTockensUserData={
            _id:userDataFromTocken._id,
            email:userDataFromTocken.email,
            name:userDataFromTocken.name
        }

        const tockens=await tockenService.generateTokens(generateTockensUserData)
        await tockenService.saveToken(userDataFromTocken._id,tockens.refreshToken)
        return {
            user:userDataFromTocken._id,
            ...tockens
        }

    }
}

export const authService=new Auth()