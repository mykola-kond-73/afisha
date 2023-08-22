"use client"

import { LoginModalPropsType } from "@/types"
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

export const LoginModal=(props:LoginModalPropsType)=>{
    return(
        <Modal isOpen={props.show} onClose={props.hideFunc}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>modal</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Sign in
            </Button>
            <Button variant='ghost'>Registration</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}