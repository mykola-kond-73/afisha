'use client'

import Image from "next/image"
import rightImg from '@/public/static/assets/free-icon-keyboard-left-arrow-button-60775.png'
import lefttImg from '@/public/static/assets/free-icon-keyboard-right-arrow-button-60758.png'
import centerImg from '@/public/static/assets/free-icon-expand-button-60781.png'
import classes from './header.module.scss'
import { useEffect,useState } from 'react'
import { LoginModal } from "@/components/modals"
import { ChakraProvider } from '@chakra-ui/react'

export const Header = () => {
    const [isShowModal,setShowModal]=useState(false)

    const showModal=()=>{
        setShowModal(true)
        document.body.style.overflow="hidden"
    }
    const hideModal=()=>{
        setShowModal(false)
        document.body.style.overflow=""
    }

    let tocken: string | null = ""
    useEffect(() => {
        tocken = localStorage.getItem("tocken")
    }, [])

    return (
        <ChakraProvider>
        <section className={classes.section}>
            <LoginModal show={isShowModal} hideFunc={hideModal}/>
            <header className={classes.header}>
                <nav>
                    {
                        !tocken
                            ? <span className={classes.login} onClick={showModal}>
                                Sign In
                            </span>
                            : <span className={classes.login}>
                                sign out
                            </span>
                    }
                </nav>
            </header>
            <footer className={classes.footer}>
                <div className={classes.coupleButtons}>
                    <div>
                        <Image src={lefttImg} alt="..." />
                    </div>
                    <div>
                        <Image src={rightImg} alt="..." />
                    </div>
                </div>

                <div className={classes.downButton}>
                    <Image src={centerImg} alt="..." />
                </div>

            </footer>
        </section>
        </ChakraProvider>
    )
}