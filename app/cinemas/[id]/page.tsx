'use client'

import { GET_CINEMA } from "@/API"
import { useQuery } from "@apollo/client"
import { CinemaInfoCard, FilmCard, HallCard, SessionCard } from "@/components/pages"
import { Loader, BoxContent, Error } from "@/components/fragments"
import { CinemaPageFilmType, CinemaPageHallType, CinemaPageParamsType, CinemaPageSessionType } from "@/types"
import { Box, ChakraProvider, Flex} from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'

export const dynamic = "force-dynamic"

const Cinema = ({ params }: CinemaPageParamsType) => {
    const { data, loading, error } = useQuery(GET_CINEMA, {
        variables: {
            getCinemaId: params.id
        }
    })

    if (error) return <CacheProvider><ChakraProvider> <Error size="md" code={error.message}/></ChakraProvider></CacheProvider>
    if (loading || !data) return <Loader />
    return (
        <CacheProvider>
            <ChakraProvider>
                <Box >
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <CinemaInfoCard
                            city={data.getCinema.city}
                            photo={data.getCinema.photo}
                            rating={data.getCinema.rating}
                            street={data.getCinema.street}
                            title={data.getCinema.title}
                        />

                        <BoxContent title="Films">
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
                        </BoxContent>

                        <BoxContent title="Halls">
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
                        </BoxContent>

                        <BoxContent title="Sessions">
                            {
                                data.getCinema.sessions &&
                                data.getCinema.sessions.map((elem: CinemaPageSessionType) => {
                                    return (
                                        <SessionCard
                                            key={elem._id}
                                            _id={elem._id}
                                            date={elem.date}
                                            timeline={elem.timeline}
                                            ticket={elem.ticket}
                                            film={elem.film}
                                            hall={elem.hall}
                                            noHalls={false}
                                        />
                                    )
                                })
                            }
                        </BoxContent>
                    </Flex>
                </Box>
            </ChakraProvider>
        </CacheProvider>
    )
}

export default Cinema