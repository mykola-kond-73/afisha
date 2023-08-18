import { GraphQLError } from 'graphql';
import { tockenService } from "@/services"

export const authenticate=async(tocken:string):Promise<boolean>=>{
    const [tockenType,tockenBody]=tocken.split(":")
    const isValid=await tockenService.validateAccessToken(tockenBody)

    if(tockenType!=="Bearer" || !isValid) throw new GraphQLError("Invalid authenticated data", {
        extensions: {
            code: "UNAUTHENTICATED"
        }
    })

    return true
}