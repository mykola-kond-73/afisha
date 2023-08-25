"use client"

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
} from '@chakra-ui/react'
import { FilterForm } from '../forms'
import { HorizontalPanelPropsType } from '@/types'

export const HorizontalPanel=(props:HorizontalPanelPropsType)=>{
    return(
        <Drawer
            isOpen={props.show}
            placement='top'
            onClose={props.hideFunc}
            size="md"
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{props.uri === "/cinemas" ? "Filter" : "Personal Data"}</DrawerHeader>

                <DrawerBody>
                    {
                        props.uri ==="/cinemas"
                        ?<FilterForm isLoad={props.isLoad} setLoad={props.setLoad} hideFunc={props.hideFunc} />
                        :<Text>Personal Data</Text>
                    }
                    
                </DrawerBody>

                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}