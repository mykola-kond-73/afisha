'use client'

import { GET_CINEMA } from "@/API"
import { useQuery } from "@apollo/client"
import classes from './cinema.module.scss'
import { FilmCard, HallCard, SessionCard } from "@/components/pages"
import { Photo, Loader } from "@/components/fragments"
import { CinemaPageFilmType, CinemaPageHallType, CinemaPageParamsType, CinemaPageSessionType } from "@/types"
import { ChakraProvider } from '@chakra-ui/react'

export const dynamic = "force-dynamic"

const Cinema = ({ params }: CinemaPageParamsType) => {
    const { data, loading, error } = useQuery(GET_CINEMA, {
        variables: {
            getCinemaId: params.id
        }
    })

    if (loading || !data) {
        return <Loader />
    }

    return (
        <ChakraProvider>
            <section className={classes.rootSection}>


                <div className={classes.cinemaData}>
                    <div>
                        <Photo photo={data.getCinema.photo} />
                    </div>
                    <h2>{data.getCinema.title}</h2>
                    <div>
                        <div>
                            <span>City:  </span>
                            <span>{data.getCinema.city}</span>
                        </div>
                        <div>
                            <span>Street:  </span>
                            <span>{data.getCinema.street}</span>
                        </div>
                        <div>
                            <span>Rating:  </span>
                            <span>{data.getCinema.rating}</span>
                        </div>
                    </div>
                </div>

                <div className={classes.films}>
                    <h3>Films</h3>
                    <div>
                        {
                            data.getCinema.films &&
                            data.getCinema.films.map((elem: CinemaPageFilmType) => {
                                return (
                                    <FilmCard
                                        key={elem._id}
                                        title={elem.title}
                                        description={elem.description}
                                        limitation={elem.limitation}
                                        photo={elem.photo}
                                        rating={elem.rating}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div className={classes.halls}>
                    <h3>Halls</h3>
                    <div>
                        {
                            data.getCinema.halls &&
                            data.getCinema.halls.map((elem: CinemaPageHallType) => {
                                return (
                                    <HallCard
                                        key={elem._id}
                                        busy={elem.busy}
                                        places={elem.places}
                                        reserve={elem.reserve}
                                        title={elem.title}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div className={classes.sessions}>
                    <h3>Sessions</h3>
                    <div>
                        {
                            data.getCinema.sessions &&
                            data.getCinema.sessions.map((elem: CinemaPageSessionType) => {
                                return (
                                    <SessionCard
                                        key={elem._id}
                                        date={elem.date}
                                        timeline={elem.timeline}
                                        ticket={elem.ticket}
                                        film={elem.film}
                                        hall={elem.hall}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </ChakraProvider>
    )
}

export default Cinema