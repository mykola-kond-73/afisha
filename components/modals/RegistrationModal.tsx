"use client"

import {  RegisterModalPropsType } from "@/types"
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
import { RegistrationForm } from "../forms"
import { Error } from "../fragments"

export const RegistrationModal=(props:RegisterModalPropsType)=>{
    return(
        <Modal isOpen={props.show} onClose={props.hideFunc}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            < RegistrationForm isLoadRefister={props.isLoadRefister} register={props.register}/>

          {props.registerError&&<Error code={props.registerError} size="min"/>}

          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={props.hideFunc}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}