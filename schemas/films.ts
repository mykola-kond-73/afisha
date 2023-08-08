import gql from "graphql-tag";

const types = gql`
    type FilmType{
        _id:ID!
        title:String!
        description:String!
        rating:Float!
        limitation:String!
        createdAt:String!
        updatedAt:String!
    }

    type FilmsType{
        films:[FilmType]!
        offset:Int!
        count:Int!
    }

    type UpdatedFilmType{
        _id:ID!
        title:String!
        description:String!
        rating:Float!
        limitation:String!
        updatedAt:String!
    }
`

const inputs = gql`
    input CreateFilmInput{
        title:String!
        description:String!
        limitation:String!
    }

    input UpdateFilmInput{
        title:String
        description:String
        rating:Float
        limitation:String
    }
    
    input FilterFilmInput{
        title:String
        limitation:String
        rating:String
    }
`

const queries = gql`
    type Query{
        getFilms(offset:Int!,count:Int!,filter:FilterFilmInput!):FilmsType
        getFilm(id:ID!):FilmType
    }
`

const mutations = gql`
    type Mutation{
        createFilm(input:CreateFilmInput!):FilmType
        updateFilm(id:String!,input:UpdateFilmInput!):UpdatedFilmType
        deleteFilm(id:ID!):FilmType
    }
`

const filmsGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { filmsGqlSchema}