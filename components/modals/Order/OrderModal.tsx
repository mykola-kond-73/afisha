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

export const OrderModal=(props:OrderModalPropsType)=>{
    return(
        <Modal isOpen={props.show} onClose={props.hideFunc}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>modal order</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              {props.type}
            </Button>
            <Button variant='ghost' onClick={props.hideFunc}>cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}