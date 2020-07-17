import { Lead } from "./models/Lead";
import { Deposito } from "./models/Deposito";
import { Boleta } from "./models/Boleta";
import { Pago } from "./models/Pago";

//// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    say_hello: () => "Hi, I'm a robot",
    leads: () => Lead.find(),
    depositos: () => {
      return Deposito.find()
      .then(async res => {
        const payments = await Pago.find()
        const result = res.map(x => {
          let [topay] = payments.filter(y => y.id == x.id_pago)
          if(topay){
            topay.id? x.pago.id = topay.id : x.pago.id = "0"
            x.pago.userId = topay.userId
            x.pago.createdAt = topay.createdAt
            x.pago.editable = topay.editable
            x.pago.promoId = topay.promoId
            x.pago.estado = topay.estado
            x.pago.voucher = topay.voucher
            x.pago.operacion = topay.operacion
          }
          else x.pago.id = "0"
          return x
        })
        //console.log(result)
        return result
      })
    },
    boletas: async() => {
      return Boleta.find()
      .then(res => {
        const result = res.map(x => {
          if(x.monto_de_pago_de_la_boleta)
          {
            x.descuento = x.monto_de_pago_de_la_boleta*.03
            x.monto_depositado = x.monto_de_pago_de_la_boleta - x.descuento
          }
          return x
        })
        return result
      })
    }
    
  }
};