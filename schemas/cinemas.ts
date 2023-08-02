import gql from "graphql-tag";

const types = gql`

`

const queries = gql`

`

const mutations = gql`

`

const inputs = gql`
  
`

const cinemasGqlSchema = gql`
    ${types}
    ${inputs}
    ${queries}
    ${mutations}
`

export { cinemasGqlSchema }