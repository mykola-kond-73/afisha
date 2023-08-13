import { PASSWORD_SALT } from '@/utils/env'
import bcrypt from 'bcrypt'

class Crypto{
    private static instance:Crypto|null=null

    constructor(){
        if(Crypto.instance) return Crypto.instance
        else Crypto.instance=this
    }

    async encodePassword(password:string):Promise<string>{
        const hasedPassword:string=await bcrypt.hash(password,Number(PASSWORD_SALT))
        return hasedPassword
    }

    async checkForCorrectPassword(passwordFromDB:string,requestPassword:string):Promise<boolean>{
        const isCorrect:boolean=await bcrypt.compare(requestPassword,passwordFromDB)
        return isCorrect
    }
}

export const cryptoService=new Crypto()