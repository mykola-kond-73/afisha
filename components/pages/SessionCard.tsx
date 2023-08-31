"use client"

import { FilmCard } from './FilmCard'
import { SessionCardPropsType } from "@/types"
import { HallCard } from "./HallCard"
import { BoxContent } from '@/components/fragments'
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { articleBorderColor } from '@/styles'
import { ActionsCardContainer } from '.'


export const SessionCard = (props: SessionCardPropsType) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const mounths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let [dayOfWeek, mounthOfYear, num, year] = props.date.split(" ")
    for (let day of days) {
        if (day.slice(0, 3) === dayOfWeek) dayOfWeek = day
    }
    for (let mounth of mounths) {
        if (mounth.slice(0, 3) === mounthOfYear) mounthOfYear = mounth
    }

    let [from, to] = props.timeline.split("-")
    from = from.slice(0, 8)
    to = to.slice(0, 8)

    return (
        <Box w="315px" borderRadius="15px" borderWidth="3px" borderColor={articleBorderColor}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Container>
                    <Text>Date: {`${dayOfWeek} ${mounthOfYear} ${num} ${year}`}</Text>
                    <Text>Time: {`${from}-${to}`}</Text>
                </Container>

                <BoxContent title='Film'>
                    <FilmCard
                        _id={props.film._id}
                        title={props.film.title}
                        description={props.film.description}
                        limitation={props.film.limitation}
                        photo={props.film.photo}
                        rating={props.film.rating}
                    />
                </BoxContent>

                {
                    !props.noHalls
                        ? <BoxContent title='Hall'>
                            <HallCard
                                _id={props.hall!._id}
                                title={props.hall!.title}
                                busy={props.hall!.busy}
                                places={props.hall!.places}
                                reserve={props.hall!.reserve}
                            />
                        </BoxContent>
                        : null
                }


                <Box mt="-8">
                    <Text>Cost: {props.ticket.cost}</Text>
                </Box>
                {
                    !props.noHalls
                        ?<ActionsCardContainer amount={Number(props.ticket.cost)} sessionId={props._id} />
                        : null
                }
            </Flex>
        </Box>
    )
}

