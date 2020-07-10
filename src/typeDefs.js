import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    say_hello: String!
    leads: [Lead!]!
  }
  type Lead {
    id: ID!
    nombres: String
    email: String
    celular: String
    monto: String
    tarjeta: String
    dni: String
    tipo: String
  }
`;