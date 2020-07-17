import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    say_hello: String!
    leads: [Lead!]!
    depositos: [Deposito!]!
    boletas: [Boleta!]!
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
    pago: Pago
  }
  type Boleta {
    id: ID!
    dni: Int
    nombres: String
    apellidos: String
    email: String
    id_pago: String
    id_boleta: String
    marca_temporal: String
    servicio: String
    codigo: String
    contrasenia: String
    fecha_vencimiento: String
    monto_de_pago_de_la_boleta: Float
    aprobar: String
    descuento: Float
    monto_depositado: Float
  }
  type Pago {
    id: ID!
    userId: String
    createdAt: String
    editable: Boolean
    promoId: String
    estado: String
    voucher: String
    operacion: String
  }
`;