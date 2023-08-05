import { authErrorLogger, errorLogger, validationErrorLogger } from "@/utils/logger";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLFormattedError } from "graphql";

export const handleServerError=(formattedError:GraphQLFormattedError,error:any)=>{
    switch(formattedError.extensions!.code){
        case ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED:
            validationErrorLogger.error(`${JSON.stringify(error)}`)
        case "UNAUTHENTICSTED":
            authErrorLogger.error(`${JSON.stringify(error)}`)
        default:
            errorLogger.error(`${JSON.stringify(error)}`)
    }

    return formattedError
}