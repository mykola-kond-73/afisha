import { IdArgType, ListQueryArgType,InputSessionType, UpdateSessionDataType, SessionDataType} from "@/types";
import {sessionModel } from "@/models";

class Session {
    async getSessions({offset,count}:ListQueryArgType):Promise<SessionDataType>{}
    async getSession({id}:IdArgType):Promise<SessionDataType>{}
    async createSession(input:InputSessionType):Promise<SessionDataType>{}
    async updateSession(input:InputSessionType):Promise<UpdateSessionDataType>{}
    async deleteSession({id}:IdArgType):Promise<SessionDataType>{}
}

export const sessionService = new Session()