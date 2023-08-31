import { GET_CINEMAS } from "@/API"
import { getClient } from "@/lib/apolloClient"
import {CinemasContainer } from "@/components/pages"

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
    const data=await getCinemas()

    return (
        <CinemasContainer data={data.data.getCinemas}/>
    )
}

export default Cinemas