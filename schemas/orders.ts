import gql from "graphql-tag";

const types = gql`
    enum OrderReserveStatus{
        active
        cencelled
    }

    type OrderType{
        _id:ID!
        user:UserType!
        sessions:SessionType!
        count:Int!
        payment_status:Boolean!
        payment_id:String!
        status:OrderReserveStatus!
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedOrderType{
        _id:ID!
        count:Int!
        status:OrderReserveStatus!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateOrderInput{
        user:String!
        sessions:String!
        count:Int!
        payment_status:Boolean!
        payment_id:String!
        status:OrderReserveStatus!
    }

    input UpdateOrderInput{
        count:Int!
        status:OrderReserveStatus!
    }
`

const queries = gql`
    type Query{
        getOrders(offset:Int!,count:Int!):[OrderType]
        getOrder(id:ID!):OrderType
    }
`

const mutations = gql`
    type Mutation{
        createOrder(input:CreateOrderInput!):OrderType
        updateOrder(input:UpdateOrderInput!):UpdatedOrderType
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