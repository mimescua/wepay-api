import { Lead } from "./models/Lead";
import { Deposito } from "./models/Deposito";
import { Boleta } from "./models/Boleta";
import { Prueba } from "./models/Prueba";

//// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    say_hello: () => "Hi, I'm a robot",
    leads: () => Lead.find(),
    depositos: () => Deposito.find({}),
    boletas: () => Boleta.find(),
    pruebas: () => Prueba.find(),
  }
};