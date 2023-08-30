import { CreateInputUserType, CreateUserDataType, GetUserDataType, IdArgType, ListQueryArgType, UpdateInputUserType, UpdateUserDataType, UserDataType, UserFilterType, UsersDataType } from "@/types";
import { userModel } from "@/models";
import { cryptoService } from "./crypto";
import { GraphQLError } from "graphql";
import { email, phone } from "@/utils/regExp";

class User {
    private static instance:User|null=null

    constructor(){
        if(User.instance) return User.instance
        else User.instance=this
    }

    async getUsers({ offset, count, filter }: ListQueryArgType & UserFilterType): Promise<UsersDataType> {
        let search = {}
        if (filter?.email) search = { ...search, email: filter.email }
        if (filter?.firstname) search = { ...search, "name.firstname": filter.firstname }
        if (filter?.lastname) search = { ...search, "name.lastname": filter.lastname }
        if (filter?.order) search = { ...search, history:{ $in:[filter.order]} }
        if (filter?.reserve) search = { ...search, reserve:{ $in:[filter.reserve ]}}

        const users: GetUserDataType[] = await userModel.find(search)
            .skip(offset)
            .limit(count)
            .select("-password")
            .populate([
                {
                    path: "history",
                    populate: [
                        {
                            path: "session",
                            populate: [
                                { path: "ticket" },
                                { path: "hall" },
                                { path: "film" }
                            ]
                        },
                    ],
                    select: "-user"
                },
                {
                    path: "reserve",
                    populate: [
                        {
                            path: "session",
                            populate: [
                                { path: "ticket" },
                                { path: "hall" },
                                { path: "film" }
                            ]
                        },
                    ],
                    select: "-user"
                },

            ])
            .lean()

        return {
            users,
            offset,
            count: users.length
        }

    }
    async getUser({ id }: IdArgType): Promise<GetUserDataType> {
        const user = await userModel.findById(id)
            .select("-password")
            .populate([
                {
                    path: "history",
                    populate: [
                        {
                            path: "session",
                            populate: [
                                { path: "ticket" },
                                { path: "hall" },
                                { path: "film" }
                            ]
                        },
                    ],
                    select: "-user"
                },
                {
                    path: "reserve",
                    populate: [
                        {
                            path: "session",
                            populate: [
                                { path: "ticket" },
                                { path: "hall" },
                                { path: "film" }
                            ]
                        },
                    ],
                    select: "-user"
                },

            ])
            .lean()

        return user as GetUserDataType
    }
    async getUserByEmail({ email }: { email: string }): Promise<UserDataType> {
        const user = await userModel.findOne({ email })

        return user as UserDataType
    }
    async createUser(input: CreateInputUserType): Promise<CreateUserDataType> {
        if (input.password.length < 8) {
            throw new GraphQLError("Invalid password format", {
                extensions: {
                    code: "INVALID_DATA"
                }
            })
        }
        if (!email.test(input.email)) {
            throw new GraphQLError("Invalid email format", {
                extensions: {
                    code: "INVALID_DATA"
                }
            })
        }
        if (!phone.test(input.phone)) {
            throw new GraphQLError("Invalid phone format", {
                extensions: {
                    code: "INVALID_DATA"
                }
            })
        }

        const encodePassword = await cryptoService.encodePassword(input.password)

        const newInput = {
            ...input,
            password: encodePassword
        }

        const user = await userModel.create(newInput)
        return user as CreateUserDataType
    }
    async updateUser(id: string, input: UpdateInputUserType): Promise<UpdateUserDataType> {
        await userModel.updateOne({ _id: id }, input)

        const ticket = await userModel.findById(id)
            .select('name updatedAt')
            .lean()

        return ticket as UpdateUserDataType
    }
    async deleteUser({ id }: IdArgType): Promise<UserDataType> {
        const user = await userModel.findByIdAndDelete(id)
        return user
    }
}

export const userService = new User()