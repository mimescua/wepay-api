import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    say_hello: String!
    leads: [Lead!]!
    depositos: [Deposito!]!
    boletas: [Boleta!]!
    pruebas: [Boleta!]!
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
  type Deposito {
    id: ID!
    dni: Int
    nombres: String
    apellidos: String
    codigo_operacion: Int
    monto: Float
    fecha_transaccion: String
    banco: String
    id_pago: Int
    id_deposito: Int
    aprobar: String
  }
  type Boleta {
    id: ID!
    pagoId: String
    servicio: String
    codigo: String
    contrasenia: String
    monto: Float
    vence: String
    seleccionada: Boolean
    estado: String
  }

  type Prueba {
    id: ID!
  }
`;