import moment from 'moment';
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
          const depositos  = res.reduce((acc, curr) => {
            let [topay] = users.filter(user => user.id === curr.userId)
              typeof topay !== "undefined" ? (
              topay.id ? curr.user.id = topay.id : curr.user.id = "0",
              curr.user.createdAt = topay.createdAt,
              curr.user.username = topay.username,

              curr.user.nombre = topay.profile.nombre,
              curr.user.apellido = topay.profile.apellido,
              curr.user.dni = topay.profile.dni
              ) : curr.user = {}//null
              let _createdat = moment(curr.created)
              curr.marca_temporal = _createdat.utc().format('DD/MM/YYYY HH:mm:ss');

              return [...acc, curr]
          }, [])
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

          //const boletas = _boletas.reduce((ac, p) => ([...ac,p]), [] )
          const boletas = _boletas.reduce((acc, curr) => {
            let [curr_pago] = res.filter(pago => pago.id === curr.pagoId)
            if (typeof curr_pago !== "undefined") {
              let [curr_user] = _users.filter(user => user.id === curr_pago.userId)
              let descuento = (curr.monto * new Number(2)/100);
              if (typeof curr_user !== "undefined") {

                let [curr_promo] = _promociones.filter(prom => prom.id === curr_pago.promoId)
                if (typeof curr_promo !== "undefined") {
                  if (curr_promo.tipo === true) {
                    descuento = (curr.monto * (new Number(curr_promo.descuento) + new Number(2))) / 100
                    curr.tipo_descuento = 'porcentaje'
                  }
                  else if (curr_promo.tipo === false) {
                    descuento = new Number(curr_promo.descuento) + (curr.monto * new Number(2)/100)
                    curr.tipo_descuento = 'monto'
                  }
                }
                curr_user.id ? curr.user.id = curr_user.id : curr.user.id = "0"
                curr.user.createdAt = curr_user.createdAt
                curr.user.username = curr_user.username
                
                curr.user.nombre = curr_user.profile.nombre
                curr.user.apellido = curr_user.profile.apellido
                curr.user.dni = curr_user.profile.dni
              }
              //curr.marca_temporal = curr_pago.createdAt.toLocaleString()
              let _createdat = moment(curr_pago.createdAt)
              curr.marca_temporal = _createdat.utc().format('DD/MM/YYYY HH:mm:ss');
              curr.descuento = descuento
              curr.depositado = curr.monto - descuento
            }
            else curr.user = {}//null

            return [...acc, curr]
          }, [])
          return boletas
        })
    }

  }
};