import { GET_CINEMAS } from "@/API"
import { getClient } from "@/lib/apolloClient"
import classes from './cinemas.module.scss'
import Image from "next/image"
import photo from '@/public/static/assets/free-icon-phone-4672884.png'
import Link from 'next/link'
import { Paginator } from "@/components/fragments/Paginator/Paginator"
import { CinemasPageCinemaType } from "@/types"
import { Photo } from "@/components/fragments/Photo/Photo"

const getCinemas=async(offset=0,count=1,filter={})=>{
    return await getClient().query({
        query: GET_CINEMAS,
        variables: {
            offset,
            count,
            filter
        }
    })
}


const Cinemas = async () => {
    // const data = await getClient().query({
    //     query: GET_CINEMAS,
    //     variables: {
    //         offset: 0,
    //         count: 10,
    //         filter: {}
    //     }
    // })
    const data=await getCinemas(0,10)


    return (
        <main className={classes.main}>
            <div className={classes.content}>
                <nav>
                {
                    data.data.getCinemas.cinemas.map((elem: CinemasPageCinemaType) => {
                        return (
                            <Link href={`/cinemas/${elem._id}`} key={elem._id}>
                                <article className={classes.article}>
                                    <h3>
                                        {elem.title}
                                    </h3>
                                    <div>
                                        <Photo photo={elem.photo}/>
                                    </div>
                                    <div className={classes.data}>
                                        <div>
                                            <span>City:   </span>
                                            <span>{elem.city}</span>
                                        </div>
                                        <div>
                                            <span>Street:   </span>
                                            <span>{elem.street}</span>
                                        </div>
                                        <div>
                                            <span>Rating:   </span>
                                            <span>{elem.rating}</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        )
                    })
                }
                </nav>

            </div>

            <Paginator totalCount={data.data.getCinemas.totalCount}/>
        </main>
    )
}

export default Cinemas