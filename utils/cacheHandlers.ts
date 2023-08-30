import { READ_CAHCHE_USER, UPDATE_HALL_ORDER, UPDATE_HALL_RESERVE, UPDATE_HISTORY_USER_DATA, UPDATE_ORDER_STATUS, UPDATE_RESERVE_STATUS } from "@/API"
import { ApolloCache } from "@apollo/client"
import { globalContext } from "./globalContext"

const createOrderCacheHandler=(cache:ApolloCache<any>, { data: { createOrder } }:{data:any}) => {
    const readcachedata:any = cache.readFragment({
        id: `UserType:${localStorage.getItem("user")}`,
        fragment:UPDATE_HISTORY_USER_DATA
    })

    if (readcachedata) {
        cache.writeFragment({
            id: `UserType:${localStorage.getItem("user")}`,
            data: {
                history: [...readcachedata.history, createOrder]
            },
            fragment:UPDATE_HISTORY_USER_DATA
        })
    }
}

const createReserveCacheHandler=(cache:ApolloCache<any>, { data: { createReserve } }:{data:any}) => {
    const readcachedata:any = cache.readQuery({
        query: READ_CAHCHE_USER,
        variables: {
            id: localStorage.getItem("user")
        }
    })

    if (readcachedata) {
        cache.writeQuery({
            query: READ_CAHCHE_USER,
            data: {
                getUser: {
                    reserve: [...readcachedata.getUser.reserve, createReserve]
                }
            },
            variables: {
                id: localStorage.getItem("user")
            }
        })
    }
}

const cancelOrderCacheHandler=(hallId:string)=>(cache:ApolloCache<any>,{data:{cancelOrder}}:{data:any})=>{    

    cache.writeFragment({
        id:`OrderForUserType:${cancelOrder._id}`,
        fragment:UPDATE_ORDER_STATUS,
        data:{
            status:cancelOrder.status
        }
    })
    

    const cached:any=cache.readFragment({
        id:`HallType:${hallId}`,
        fragment:UPDATE_HALL_ORDER
    })

    cache.writeFragment({
        id:`HallType:${hallId}`,
        fragment:UPDATE_HALL_ORDER,
        data:{
            busy:cached.busy.filter((elem:number)=> !cancelOrder.places.includes(elem))
        }
    })
}

const cancelReserveCacheHandler=(hallId:string)=>(cache:ApolloCache<any>,{data:{cancelReserve}}:{data:any})=>{
    cache.writeFragment({
        id:`ReserveForUserType:${cancelReserve._id}`,
        fragment:UPDATE_RESERVE_STATUS,
        data:{
            status:cancelReserve.status
        }
    })

    const cached:any=cache.readFragment({
        id:`HallType:${hallId}`,
        fragment:UPDATE_HALL_RESERVE
    })

    cache.writeFragment({
        id:`HallType:${hallId}`,
        fragment:UPDATE_HALL_RESERVE,
        data:{
            reserve:cached.reserve.filter((elem:number)=> !cancelReserve.places.includes(elem))
        }
    })
}

export {
    createOrderCacheHandler,
    createReserveCacheHandler,
    cancelOrderCacheHandler,
    cancelReserveCacheHandler
}