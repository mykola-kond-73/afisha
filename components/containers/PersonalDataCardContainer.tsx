"use client"

import { gql, useMutation, useQuery } from "@apollo/client"
import { PersonalDataCard } from "../pages/PersonalDataCard"
import { CANCEL_ORDER, CANCEL_RESERVE, DELETE_USER, GET_USER, UPDATE_HALL_ORDER, UPDATE_HALL_RESERVE, UPDATE_ORDER_STATUS, UPDATE_RESERVE_STATUS} from "@/API"
import { Error, Loader } from "../fragments"
import { Text } from "@chakra-ui/react"
import { globalContext } from "@/utils/globalContext"
import { cancelOrderCacheHandler, cancelReserveCacheHandler } from "@/utils/cacheHandlers"
import { curentPageColor } from "@/styles"

export const PersonalDataCardContainer=()=>{
    const [delUser,{data:deletedUserData,loading:deleteUserLoading,error:deleteUserError}]=useMutation(DELETE_USER)
    const [calcelOrder,{loading:cancelOrderLoading}]=useMutation(CANCEL_ORDER)
    const [cancelReserve,{loading:cancelReserveLoading}]=useMutation(CANCEL_RESERVE)

    const {data,loading,error}=useQuery(GET_USER,{
        variables:{
            getUserId:localStorage.getItem("user")
        }
    })
    
    const deleteUser=async (userId:string)=>{
        const {data,errors}=await delUser({
            variables:{
                deleteUserId:userId
            }
        })

        if(!errors) globalContext.getSingOut()()
    }

    const cancel=async(id:string,type:"order"|"reserve",hallId:string)=>{
        if(type==="order"){
            await calcelOrder({
                variables:{
                    cancelOrderId:id
                },
                //@ts-ignore
                update:cancelOrderCacheHandler(hallId)
            })
        }
        else if (type==="reserve"){
            await cancelReserve({
                variables:{
                    cancelReserveId:id
                },
                //@ts-ignore
                update:cancelReserveCacheHandler(hallId)
            })
        }
    }

    if(!localStorage.getItem("user")) return <Text borderWidth="3px" borderRadius="15px" borderColor={curentPageColor} textColor={curentPageColor} textAlign="center">No authentication</Text>
    if (loading) return <Loader />
    if (error) return <Error code={error.message} size="min" />

    return(
        <PersonalDataCard 
            data={data.getUser}
            delUserFunc={deleteUser}
            cancelFunc={cancel}
            loadOrder={cancelOrderLoading}
            loadReserve={cancelReserveLoading}
            loadDelUser={deleteUserLoading}
        />
    )
}