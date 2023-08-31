"use client"

import { OrderModalPropsType } from "@/types"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { OrderReserveForm } from "../forms"
import { Error } from "../fragments"

export const OrderModal = (props: OrderModalPropsType) => {
  return (
    <Modal isOpen={props.show} onClose={props.hideFunc}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderReserveForm
            isLoadOrder={props.isLoadOrder}
            isLoadReserve={props.isLoadReserve}
            type={props.type}
            order={props.order}
            reserve={props.reserve}
            amount={props.amount}
          />
          
          {
            props.orderError
              ? <Error code={props.orderError} size="min" />
              : props.reserveError
                ? <Error code={props.reserveError} size="min" />
                : null
          }
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={props.hideFunc}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}