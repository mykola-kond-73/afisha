"use client"

import {  PersonalDataPanelPropsType } from '@/types'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { PersonalDataCardContainer } from '../pages'
import { Loader } from '../fragments'

export const PersonalDataPanel = (props:PersonalDataPanelPropsType) => {
    return (
        <Drawer
            isOpen={props.show}
            placement='right'
            onClose={props.hideFunc}
            size="md"
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Personal Data</DrawerHeader>

                <DrawerBody>
                    <PersonalDataCardContainer/>
                </DrawerBody>

                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}