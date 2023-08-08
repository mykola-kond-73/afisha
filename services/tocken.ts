import {   AbbreviatedTockenDataType, GeneratedTockensDataType, IdArgType, ListQueryArgType, TockenDataType, TockenFilterType, TockensDataType, UserArgServiceType} from "@/types";
import { tockenModel} from "@/models";

class Tocken {
    async getTockens({offset,count,filter}:ListQueryArgType&TockenFilterType):Promise<TockensDataType>{
        let search={}
        if(filter?.user) search={...search, "user._id":filter.user}

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
//     async validateAccessToken(tocken:string):Promise<UserArgServiceType>{}
//     async validateRefreshToken(tocken:string):Promise<UserArgServiceType>{}
//     async generateTokens(user:UserArgServiceType):Promise<GeneratedTockensDataType>{}
//     async saveToken(userId:string,tocken:string):Promise<TockenDataType>{}
//     async findToken(tocken:string):Promise<AbbreviatedTockenDataType>{}
    async deleteTocken({id}:IdArgType):Promise<AbbreviatedTockenDataType>{
        const tocken=await tockenModel.findByIdAndDelete(id)
        return tocken
    }
}

export const tockenService = new Tocken()