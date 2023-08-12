import { HallDataType } from "@/types";
import { GraphQLError } from "graphql";

const filterPlaces=(hall:HallDataType,places:Array<number>)=>{
    for (let i = 0; i < places.length; i++) {
        if (hall.places < places[i]) {
            throw new GraphQLError("There is no such place", {
                extensions: {
                    code: "INVALID_DATA"
                }
            })
        }
        if (
            hall.busy.includes(places[i]) ||
            hall.reserve.includes(places[i])
        ) {
            throw new GraphQLError("Place is busy or reserve", {
                extensions: {
                    code: "INVALID_DATA"
                }
            })
        }
    }
}

export{
    filterPlaces
}