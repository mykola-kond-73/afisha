import gql from "graphql-tag";

const types = gql`
    type CinemaType{
        _id:ID!
        title:String!
        city:String!
        street:String!
        photo:String!
        rating:Float!
        films:[FilmType]!
        halls:[HallType]!
        sessions:[SessionType]! 
        createdAt:String!
        updatedAt:String!
    }

    type CreateCinemaType{
        _id:ID!
        title:String!
        city:String!
        street:String!
        photo:String!
        rating:Float!
        films:[String]!
        halls:[String]!
        sessions:[String]! 
        createdAt:String!
        updatedAt:String!
    }

    type UpdatedCinemaType{
        _id:ID!
        title:String!
        city:String!
        street:String!
        photo:String!
        rating:Float!
        films:[FilmType]!
        halls:[HallType]!
        sessions:[SessionType]! 
        updatedAt:String!
    }

    type CinemasType{
        cinemas:[CinemaType]!
        offset:Int!
        count:Int!
    }
`

const inputs = gql`
    input CreateCinemaInput{
        title:String!
        city:String!
        street:String!
        films:[String!]!
        halls:[String!]!
        sessions:[String!]!
        photo:String!
    }

    input UpdateCinemaInput{
        title:String
        city:String
        street:String
        photo:String
        rating:Float
        films:[String!]
        halls:[String!]
        sessions:[String!]
    }

    input FilterCinemaInput{
        title:String
        city:String
        street:String
        rating:String
        film:String
        session:String
    }
`

const queries = gql`
    type Query{
        getCinemas(offset:Int!,count:Int!,filter:FilterCinemaInput!):CinemasType
        getCinema(id:ID!):CinemaType
    }
`

const mutations = gql`
    type Mutation{
        createCinema(input:CreateCinemaInput!):CreateCinemaType
        updateCinema(id:String!,input:UpdateCinemaInput!):UpdatedCinemaType
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