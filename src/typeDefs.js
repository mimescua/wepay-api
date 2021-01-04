import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    say_hello: String!
    leads: [Lead!]!
    leadslp: [Leadlp!]!
    depositos: [Deposito!]!
    depositos_upd(last_id: String): [Deposito!]!
    boletas: [Boleta!]!
    boletas_upd(last_id: String): [Boleta!]!
    users: [User]!
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
  type Leadlp {
    id: ID!
    nombres: String
    email: String
    celular: String
    monto: String
    tarjeta: String
    origen: String
    createdAt: String
  }
  type User {
    id: ID
    createdAt: String
    username: String
    
    nombre: String
    apellido: String
    dni: String
    celular: String
    email: String
    roles: [String]
    marca_temporal: String
  }
  type Deposito {
    id: ID!
    url: String
    name: String
    operacion: String
    monto: String
    fecha: String
    banco: String
    pagoId: String
    userId: String
    aprobado: String
    created: String
    pendiente: String
    user: User
    marca_temporal: String
  }
  type Boleta {
    id: ID!
    pagoId: String
    servicio: String
    codigo: String
    contrasenia: String
    monto: Float
    vence: String
    seleccionada: String
    estado: String
    estadoRetirador: String
    retiroId: String
    user: User
    pago: Pago
    promocion: Promocion

    comision_calc: Float
    promocion_calc: Float
    descuento: Float
    depositado: Float
    marca_temporal: String
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
  type Promocion {
    id: ID!
    codigo: String,
    descuento: String,
    tipo: Boolean
  }
`;