"use client"

import { FilterPanelPropsType, PanelPropsType } from '@/types'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { FilterForm } from '../forms'

export const FilterPanel = (props:FilterPanelPropsType) => {
    return (
        <Drawer
            isOpen={props.show}
            placement='left'
            onClose={props.hideFunc}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filters</DrawerHeader>

                <DrawerBody>
                    <FilterForm isLoad={props.isLoad} setLoad={props.setLoad} hideFunc={props.hideFunc} />
                </DrawerBody>

                <DrawerFooter>
                    
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}