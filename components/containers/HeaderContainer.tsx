"use client"

import { LoginModal } from "@/components/modals"
import { ChakraProvider, useBoolean } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { RegistrationModal } from "@/components/modals/RegistrationModal"
import { HorizontalPanel, PersonalDataPanel } from "@/components/panels"
import { FilterPanel } from "@/components/panels/FilterPanel"
import { Header } from '../globals/Header'
import { globalContext } from '@/utils/globalContext'
import { usePathname } from 'next/navigation'
import {  useMutation } from '@apollo/client'
import {  LOGIN, LOGOUT, REGISTER } from '@/API'
import { RegisterDataType} from '@/types'

export const HeaderContainer = () => {
    const uri = usePathname()

    const [isShowModal, setShowModal] = useBoolean(false)
    const [isShowRegisterModal, setShowRegisterModal] = useBoolean(false)
    const [isShowPersonalDataPanel, setShowPersonalDataPanel] = useBoolean(false)
    const [isShowFilterPanel, setShowFilterPanel] = useBoolean(false)
    const [isShowHorizontalPanel, setShowHorizontalPanel] = useBoolean(false)
    const [isLoadFilter, setLoadFilter] = useBoolean(false)

    globalContext.setOnLoginModal(setShowModal.on)

    const [login, { data, loading, error }] = useMutation(LOGIN)
    const [register, { data: registerData, loading: registerLoading, error: registerError }] = useMutation(REGISTER)
    const [logout] = useMutation(LOGOUT)

    const signOut = async () => {
        localStorage.removeItem("tocken")
        localStorage.removeItem("user")
        globalContext.deleteRefreshTocken()
        const { data: logoutData, errors: logOutError } = await logout({
            variables: {
                refreshToken: globalContext.getRefreshTocken()
            }
        })

        if (logOutError) console.log("signout error", logOutError)
    }
    globalContext.setSingOut(signOut)

    const signIn = async (email: string, password: string) => {
        const { data, errors: loginError } = await login({
            variables: {
                input: {
                    email,
                    password
                }
            }
        })
        if (!loginError) setShowModal.off()
        else console.log("signin error", loginError)

        localStorage.setItem("tocken", data.login.accessToken)
        localStorage.setItem("user", data.login.user)
        globalContext.setRefreshTocken(data.login.refreshToken)
    }

    const registerAndSignIn = async (data: RegisterDataType) => {
        const { data: registerData, errors: registerError } = await register({
            variables: {
                input: {
                    ...data
                }
            }
        })
        if (!registerError) signIn(data.email, data.password)
        else console.log("register error", registerError)
        setShowRegisterModal.off()
    }

    let tocken: string | null = ""
    if(typeof window !== "undefined") tocken=localStorage.getItem("tocken")    

    return (
        <CacheProvider>
            <ChakraProvider>

                <LoginModal show={isShowModal} hideFunc={setShowModal.off} showFunc={setShowRegisterModal.on} isLoadLogin={loading} signIn={signIn} loginError={error?.message} />
                <RegistrationModal show={isShowRegisterModal} hideFunc={setShowRegisterModal.off} isLoadRefister={registerLoading} registerError={registerError?.message} register={registerAndSignIn} />
                <PersonalDataPanel show={isShowPersonalDataPanel} hideFunc={setShowPersonalDataPanel.off} />
                <FilterPanel show={isShowFilterPanel} hideFunc={setShowFilterPanel.off} isLoad={isLoadFilter} setLoad={setLoadFilter} />
                <HorizontalPanel uri={uri} isLoad={isLoadFilter} setLoad={setLoadFilter} show={isShowHorizontalPanel} hideFunc={setShowHorizontalPanel.off} />

                <Header
                    uri={uri}
                    tocken={tocken}
                    showFilterPanel={setShowFilterPanel.on}
                    showModal={setShowModal.on}
                    showPersonalDataPanel={setShowPersonalDataPanel.on}
                    showHorizontalPanel={setShowHorizontalPanel.on}
                    logout={signOut}
                />

            </ChakraProvider>
        </CacheProvider>
    )
}