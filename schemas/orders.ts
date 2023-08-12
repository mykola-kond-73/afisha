import gql from "graphql-tag";

const types = gql`
    enum OrderReserveStatus{
        active
        cancelled
    }

    type OrderType{
        _id:ID!
        user:UserForOrderReserveTockenType!
        session:SessionType!
        places:[Int!]!
        payment_status:Boolean!
        payment_id:String!
        status:OrderReserveStatus!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedOrderType{
        _id:ID!
        places:[Int!]!
        updatedAt:String!
    }

    type CanceledOrderType{
        _id:ID
        status:OrderReserveStatus
        updatedAt:String
    }

    type OrdersType{
        orders:[OrderType]!
        offset:Int!
        count:Int!
    }

    type OrderForUserType{
        _id:ID!
        session:SessionType!
        places:[Int!]!
        payment_status:Boolean!
        payment_id:String!
        status:OrderReserveStatus!
        createdAt:String!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateOrderInput{
        user:String!
        session:String!
        places:[Int!]!
        payment_status:Boolean!
        payment_id:String!
    }

    input UpdateOrderInput{
        places:[Int!]
    }

    input FilterOrderInput{
        user:String
        session:String
        place:Int
        status:OrderReserveStatus
        payment_status:String
        payment_id:String
    }
`

const queries = gql`
    type Query{
        getOrders(offset:Int!,count:Int!,filter:FilterOrderInput!):OrdersType
        getOrder(id:ID!):OrderType
    }
`

const mutations = gql`
    type Mutation{
        createOrder(input:CreateOrderInput!):OrderType
        updateOrder(id:String!,input:UpdateOrderInput!):UpdatedOrderType
        cancelOrder(id:String!):CanceledOrderType
        deleteOrder(id:ID!):OrderType
    }
`

const ordersGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { ordersGqlSchema }