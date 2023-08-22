"use client"

import classes from './actionsCard.module.scss'
import { OrderModal } from '@/components/modals'
import {useState} from 'react'

export const ActionsCard = () => {
    const [isShowModal,setShowModal]=useState(false)
    const [typeModal,setTypeModal]=useState<"buy"|"reserve"|"">('')

    const showModal=(type:"buy"|"reserve")=>{
        setShowModal(true)
        setTypeModal(type)
        document.body.style.overflow="hidden"
    }
    const hideModal=()=>{
        setShowModal(false)
        document.body.style.overflow=""
    }

    return (
        <div className={classes.actions}>
            <OrderModal show={isShowModal} hideFunc={hideModal} type={typeModal}/>
            <button onClick={()=>showModal("buy")}>Busy</button>
            <button onClick={()=>showModal("reserve")}>Reserve</button>
        </div>
    )
}