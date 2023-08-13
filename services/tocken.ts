import {   AbbreviatedTockenDataType, GeneratedTockensDataType, IdArgType, ListQueryArgType, TockenDataType, TockenFilterType, TockensDataType, UserArgServiceType} from "@/types";
import { tockenModel} from "@/models";
import jwt from 'jsonwebtoken';
import { Types } from "mongoose";
import { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_TIME_LIFE, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_TIME_LIFE } from "@/utils/env";

class Tocken {
    private static instance:Tocken |null=null

    constructor(){
        if(Tocken .instance) return Tocken .instance
        else Tocken .instance=this
    }

    async getCountDocuments():Promise<number>{
        const count=await tockenModel.countDocuments()
        return count
    }

    async getTockens({offset,count,filter}:ListQueryArgType&TockenFilterType):Promise<TockensDataType>{
        let search={}
        if(filter?.user) search={...search, user:filter.user}

        const tockens:TockenDataType[]=await tockenModel.find(search)
            .skip(offset)
            .limit(count)
            .populate('user',"-password")
            .lean()

        return {
            tockens,
            offset,
            count:tockens.length
        }
    }
    async validateAccessToken(tocken:string):Promise<UserArgServiceType | null>{
        try{
            const userData= jwt.verify(tocken,JWT_ACCESS_TOKEN_SECRET)
            return userData as UserArgServiceType
        }catch(error){
            return null
        }
    }
    async validateRefreshToken(tocken:string):Promise<UserArgServiceType | null>{
        try{
            const userData= jwt.verify(tocken,JWT_REFRESH_TOKEN_SECRET)
            return userData as UserArgServiceType
        }catch(error){
            return null
        }
    }
    async generateTokens(user:UserArgServiceType):Promise<GeneratedTockensDataType>{
        const accessToken = jwt.sign({...user}, JWT_ACCESS_TOKEN_SECRET, { expiresIn:JWT_ACCESS_TOKEN_TIME_LIFE})
        const refreshToken= jwt.sign({...user}, JWT_REFRESH_TOKEN_SECRET, { expiresIn:JWT_REFRESH_TOKEN_TIME_LIFE})

        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId:Types.ObjectId,tocken:string):Promise<TockenDataType>{
        const prevTockenData=await tockenModel.findOne({user:userId})
        if(prevTockenData){
            await tockenModel.updateOne({_id:prevTockenData._id},{refreshToken:tocken})
            const tockenData=await tockenModel.findById(prevTockenData._id)
            return tockenData
        }
        const tockenData=await tockenModel.create({user:userId,refreshToken:tocken})
        return tockenData
    }
    async findTokenByUserId(userId:Types.ObjectId):Promise<AbbreviatedTockenDataType>{
        const tockenData=await tockenModel.findOne({user:userId})
        return tockenData
    }
    async deleteTocken({id}:IdArgType):Promise<AbbreviatedTockenDataType>{
        const tocken=await tockenModel.findByIdAndDelete(id)
        return tocken
    }
}

export const tockenService = new Tocken()