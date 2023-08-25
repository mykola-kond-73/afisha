"use client"

import { ActionCardContainerPropsType } from "@/types"
import { globalContext } from "@/utils/globalContext"
import { useBoolean } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_ORDER, CREATE_RESERVE } from "@/API"
import { ActionsCard } from "./ActionsCard"

export const ActionsCardContainer = (props: ActionCardContainerPropsType) => {
    const [isShowModal, setShowModal] = useBoolean(false)
    const [typeModal, setTypeModal] = useState<"order" | "reserve" | "">('')

    const [order, { data: orderData, loading: orderLoading, error: orderError }] = useMutation(CREATE_ORDER)
    const [reserve, { data: reserveData, loading: reserveLoading, error: reserveError }] = useMutation(CREATE_RESERVE)


    const showModal = (type: "order" | "reserve") => {
        if (localStorage.getItem("tocken")) {
            setShowModal.on()
            setTypeModal(type)
        }
        else globalContext.getOnLoginModal()()
    }
    const hideModal = () => {
        setShowModal.off()
    }

    const createOrder = async (places: number[]) => {
        const { data: orderData, errors: orderError } = await order({
            variables: {
                input: {
                    places,
                    session: props.sessionId,
                    user: localStorage.getItem("user")
                }
            },
            context: {
                headers: {
                    "Authorization": `Bearer:${localStorage.getItem("tocken")}`
                }
            }
        })
        if (orderError) console.log("order error", orderError)
        else setShowModal.off()
    }

    const createReserve = async (places: number[]) => {
        const { data: reserveData, errors: reserveError } = await reserve({
            variables: {
                input: {
                    places,
                    session: props.sessionId,
                    user: localStorage.getItem("user")
                }
            },
            context: {
                headers: {
                    "Authorization": `Bearer:${localStorage.getItem("tocken")}`
                }
            }
        })
        if (reserveError) console.log("reserve error", orderError)
        else setShowModal.off()
    }

    return (
        <ActionsCard
            show={isShowModal}
            hideFunc={hideModal}
            type={typeModal}
            isLoadOrder={orderLoading}
            isLoadReserve={reserveLoading}
            order={createOrder}
            reserve={createReserve}
            orderError={orderError?.message}
            reserveError={reserveError?.message}
            showModal={showModal}
        />
    )
}