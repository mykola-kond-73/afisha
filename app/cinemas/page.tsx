import { GET_CINEMAS } from "@/API" 
import { getClient } from "@/lib/apolloClient"

const Cinemas = async () => {
    // const data = await getClient().query({
    //     query: GET_CINEMAS,
    //     variables: {
    //         offset: 0,
    //         count: 100,
    //         filter: {}
    //     }
    // })

    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}

export default Cinemas