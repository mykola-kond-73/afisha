import { InputLoginType, RefreshTockenDataType, UserDataType } from "@/types";

class Auth{
    async login(input:InputLoginType):Promise<UserDataType>{}
    async logout(tocken:string):Promise<boolean>{}
    async refresh(tocken:string):Promise<RefreshTockenDataType>{}
}

export const authService=new Auth()