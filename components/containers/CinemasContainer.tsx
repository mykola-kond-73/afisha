"use client"

import { useLazyQuery } from "@apollo/client"
import { CinemaCard } from "../pages"
import { GET_CINEMAS } from "@/API"
import { useState } from "react"
import { globalContext } from "@/utils/globalContext"
import { PAGE_SIZE } from "@/utils/env"
import { CinemasContainerPropsType } from "@/types"

export const CinemasContainer = (props: CinemasContainerPropsType) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [getCinemas, { data, error, loading }] = useLazyQuery(GET_CINEMAS)

    const getPage = async (currentPage: number,filter={}) => {
        const { data: cinemasData, error: cinemasError } = await getCinemas({
            variables: {
                offset: (currentPage - 1) * PAGE_SIZE,
                count: PAGE_SIZE,
                filter: filter
            }
        })
        if (!cinemasError) setCurrentPage(currentPage)
        else console.log(cinemasError)
    }
    globalContext.setCinemasCallback(getPage)

    return (
        <CinemaCard
            loading={loading}
            error={error?.message}
            countInPage={PAGE_SIZE}
            currentPage={currentPage}
            getFunc={getPage}
            data={data ? data.getCinemas : props.data}
        />
    )
}