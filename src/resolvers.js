import moment from 'moment';
import { Lead } from "./models/Lead";
import { Leadlp } from "./models/Leadlp";
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
    leadslp: () => {
      return Leadlp.find()
      .then(async res => {
        const leadslps = res.reduce((acc, curr) => {
          curr.id,
          curr.nombres,
          curr.email,
          curr.celular,
          curr.monto,
          curr.tarjeta,
          curr.origen,
          curr.createdAt = moment(curr.createdAt).format('DD/MM/YYYY HH:mm:ss');
        
          return [...acc, curr]
        },[])
        return leadslps
      })
    },
    //depositos: () => Deposito.find().populate('User'),
    depositos: () => {
      return Deposito.find()
        .then(async res => {
          const users = await User.find()
          const pagos = await Pago.find()
          const depositos  = res.reduce((acc, curr) => {
            let [topay] = users.filter(user => user.id === curr.userId)
            let [pago] = pagos.filter(pag => pag.id === curr.pagoId)
              typeof topay !== "undefined" ? (
              topay.id ? curr.user.id = topay.id : curr.user.id = "0",
              curr.user.createdAt = topay.createdAt,
              curr.user.username = topay.username,

              curr.user.nombre = topay.profile.nombre,
              curr.user.apellido = topay.profile.apellido,
              curr.user.dni = topay.profile.dni
              ) : curr.user = {}//null
              if(curr.fecha) curr.fecha = moment(curr.fecha).format('DD/MM/YYYY');

              if(pago) curr.marca_temporal = moment(pago.createdAt).format('DD/MM/YYYY HH:mm:ss');
              //let _createdat = moment(curr.created)
              //curr.marca_temporal = _createdat.utc().format('DD/MM/YYYY HH:mm:ss');
              //curr.marca_temporal = _createdat.utc().format('DD/MM/YYYY');

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

              let _comision = new Number(0)
              let _promocion = new Number(0)
              curr.comision ? _comision = (curr.monto * new Number(curr.comision)) / 100 : _comision = (curr.monto * new Number(2)) / 100
              let _descuento = _comision
              
              if (typeof curr_user !== "undefined") {

                let [curr_promo] = _promociones.filter(prom => prom.id === curr_pago.promoId)
                if (typeof curr_promo !== "undefined") {
                  if (curr_promo.tipo === true) _promocion = (curr.monto * new Number(curr_promo.descuento)) / 100
                  else if (curr_promo.tipo === false) _promocion = new Number(curr_promo.descuento)
                  _descuento = _comision + _promocion
                }
                curr_user.id ? curr.user.id = curr_user.id : curr.user.id = "0"
                curr.user.createdAt = curr_user.createdAt
                curr.user.username = curr_user.username
                
                curr.user.nombre = curr_user.profile.nombre
                curr.user.apellido = curr_user.profile.apellido
                curr.user.dni = curr_user.profile.dni
                curr.user.celular = curr_user.profile.celular
                curr.user.email = curr_user.emails[0].address
              }
              let _createdat = moment(curr_pago.createdAt)
              //curr.marca_temporal = _createdat.utc().local().format('DD/MM/YYYY HH:mm:ss');
              curr.marca_temporal = _createdat.utcOffset(-5 * 60).format('DD/MM/YYYY HH:mm:ss');
              if(curr.vence) curr.vence = moment(curr.vence).format('DD/MM/YYYY');

              curr.comision_calc = _comision
              curr.promocion_calc = _promocion
              curr.descuento = _descuento
              curr.depositado = curr.monto - _descuento
            }
            else curr.user = {}//null

            return [...acc, curr]
          }, [])
          return boletas
        })
    },
    users: () => {
      return User.find()
      .then(async res => {
        const leadslps = res.reduce((acc, curr) => {
          curr.id,
          curr.createdAt = moment(curr.createdAt).format('DD/MM/YYYY HH:mm:ss');
          curr.username,
          curr.nombre = curr.profile.nombre,
          curr.apellido = curr.profile.apellido,
          curr.dni = curr.profile.dni,
          curr.celular = curr.profile.celular,
          curr.email = curr.emails[0].address,
          curr.roles = curr.roles? curr.roles : null
          
          return [...acc, curr]
        },[])
        return leadslps
      })
    },
  }
};