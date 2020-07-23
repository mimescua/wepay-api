import { Lead } from "./models/Lead";
import { Deposito } from "./models/Deposito";
import { Boleta } from "./models/Boleta";
import { User } from "./models/User";
import { Pago } from "./models/Pago";
import { Promocion } from "./models/Promocion";

//// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    say_hello: () => "Hi, I'm a robot",
    leads: () => Lead.find(),
    //depositos: () => Deposito.find().populate('User'),
    depositos: () => {
      return Deposito.find()
        .then(async res => {
          const users = await User.find()
          const depositos = res.map(deposito => {
            let [topay] = users.filter(user => user.id === deposito.userId)
            typeof topay !== "undefined" ? (
              topay.id ? deposito.user.id = topay.id : deposito.user.id = "0",
              deposito.user.createdAt = topay.createdAt,
              deposito.user.username = topay.username,

              deposito.user.nombre = topay.profile.nombre,
              deposito.user.apellido = topay.profile.apellido,
              deposito.user.dni = topay.profile.dni
              //curr_deposito = {...deposito, ...topay.id, ...topay.createdAt, ...topay.username, ...topay.profile.nombre, ...topay.profile.apellido, ...topay.profile.dni }
            ) : deposito.user = null
            return deposito
          })
          return depositos
        })
    },
    boletas: () => {
      return Pago.find({ editable: false })
        .then(async res => {
          const pagoIds = res.map(r => r.id)
          const _boletas = await Boleta.find({ pagoId: { $in: pagoIds } })
          const boletaIds = res.map(b => b.userId)
          const _users = await User.find({ _id: { $in: boletaIds } })
          const _promociones = await Promocion.find()

          const boletas = _boletas.map(boleta => {
            res.map(pago => {
              let [curr_user] = _users.filter(user => user.id === pago.userId)
              if (typeof curr_user !== "undefined" && boleta.pagoId === pago._id) {
                if (pago.promoId) {
                  let [curr_promo] = _promociones.filter(prom => prom.id === pago.promoId)
                  if (typeof curr_promo !== "undefined") {
                    let descuento = 0;
                    if (curr_promo.tipo === 'true') {
                      descuento = (boleta.monto * curr_promo.descuento) / 100
                    }
                    else if (curr_promo.tipo === 'false') {
                      descuento = curr_promo.descuento
                    }
                    boleta.descuento = descuento
                    boleta.depositado = boleta.monto - descuento
                  }
                }
                curr_user.id ? boleta.user.id = curr_user.id : boleta.user.id = "0"
                boleta.user.createdAt = curr_user.createdAt
                boleta.user.username = curr_user.username

                boleta.user.nombre = curr_user.profile.nombre
                boleta.user.apellido = curr_user.profile.apellido
                boleta.user.dni = curr_user.profile.dni
              } else boleta.user = {}
            })
            return boleta
          })
          return boletas
        })
    }

  }
};