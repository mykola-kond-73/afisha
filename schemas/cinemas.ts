import gql from "graphql-tag";

const types = gql`
    type CinemaType{
        _id:ID!
        title:String!
        city:String!
        street:String!
        rating:Float!
        films:[FilmType]!
        halls:[HallType]!
        sessions:[SessionType]! 
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedCinemaType{
        _id:ID!
        title:String!
        city:String!
        street:String!
        rating:Float!
        films:[FilmType]!
        halls:[HallType]!
        sessions:[SessionType]! 
        updatedAt:String!
    }
`

const inputs = gql`
    input CinemaInput{
        title:String!
        city:String!
        street:String!
        rating:Float!
        films:[String!]!
        halls:[String!]!
        sessions:[String!]!
    }
`

const queries = gql`
    type Query{
        getCinemas(offset:Int!,count:Int!):[CinemaType]
        getCinema(id:ID!):CinemaType
    }
`

const mutations = gql`
    type Mutation{
        createCinema(input:CinemaInput!):CinemaType
        updateCinema(input:CinemaInput!):UpdatedCinemaType
        deleteCinema(id:ID!):CinemaType
    }
`

const cinemasGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { cinemasGqlSchema }