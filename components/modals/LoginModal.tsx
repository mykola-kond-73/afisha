"use client"

import { LoginModalPropsType, LoginValuesType } from "@/types"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { LoginForm } from "../forms"
import { Error } from "../fragments"

export const LoginModal = (props: LoginModalPropsType) => {
  const register = () => {
    props.showFunc()
    props.hideFunc()
  }

  return (
    <Modal isOpen={props.show} onClose={props.hideFunc}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LoginForm isLoadLogin={props.isLoadLogin} signIn={props.signIn}/>
          {props.loginError&&<Error code={props.loginError} size="min"/>}
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={register}>Registration</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}