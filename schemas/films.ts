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
    input FilmInput{
        title:String!
        description:String!
        rating:Float!
        limitation:String!
    }
`

const queries = gql`
    type Query{
        getFilms(offset:Int!,count:Int!):[FilmType]
        getFilm(id:ID!):FilmType
    }
`

const mutations = gql`
    type Mutation{
        createFilm(input:FilmInput!):FilmType
        updateFilm(input:FilmInput!):UpdatedFilmType
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