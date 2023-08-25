"use client"

import { GET_CINEMAS } from '@/API'
import { useLazyQuery, } from '@apollo/client'
import {useRef, useState,useEffect} from 'react'

export const Paginator = (props: PropsType) => {

    let page =useRef(1)
    const countInPage = 2
    const pages = Math.round(props.totalCount / countInPage)

    const pagesArr=[]
    for (let i = 1; i <= pages; i++) {
        pagesArr.push(i)
    }

    console.log(page.current)
    page.current++
    console.log(page.current)

    console.log(props.totalCount, countInPage)
    console.log(pages)
    console.log(pagesArr)

    // const[getCinemas, {data,error,loading}]=useLazyQuery(GET_CINEMAS,{
    //     variables:{
    //         offset: page.current*countInPage,
    //         count: countInPage,
    //         filter: {}
    //     }
    // })


    return (
        <div>
            {
                pagesArr.map((elem: number) => {
                    return (
                        <p key={elem} >
                            {elem}
                        </p>
                    )
                })
            }
        </div>
    )
}

type PropsType = {
    totalCount: number
    // getCallBack: (offset: number, count: number, filter: {}) => any
}