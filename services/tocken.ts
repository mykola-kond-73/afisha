import {   AbbreviatedTockenDataType, GeneratedTockensDataType, IdArgType, ListQueryArgType, TockenDataType, UserArgServiceType} from "@/types";
import { tockenModel} from "@/models";

class Tocken {
    async getTockens({offset,count}:ListQueryArgType):Promise<TockenDataType>{}
    async validateAccessToken(tocken:string):Promise<UserArgServiceType>{}
    async validateRefreshToken(tocken:string):Promise<UserArgServiceType>{}
    async generateTokens(user:UserArgServiceType):Promise<GeneratedTockensDataType>{}
    async saveToken(userId:string,tocken:string):Promise<TockenDataType>{}
    async findToken(tocken:string):Promise<AbbreviatedTockenDataType>{}
    async deleteTocken({id}:IdArgType):Promise<AbbreviatedTockenDataType>{}
}

export const tockenService = new Tocken()