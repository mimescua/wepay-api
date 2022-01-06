import moment from 'moment';
import { Lead } from "./models/Lead";
import { Leadlp } from "./models/Leadlp";
import { Deposito } from "./models/Deposito";
import { Boleta } from "./models/Boleta";
import { User } from "./models/User";
import { Pago } from "./models/Pago";
import { Promocion } from "./models/Promocion";
import { PagosReales } from "./models/PagosReales"

const isEmptyObject = (obj) => JSON.stringify(obj) === '{}';
const isEmptyArray = (obj) => JSON.stringify(obj) === '[]';

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

              if(pago){
                let _createdat = moment(pago.createdAt)
                curr.marca_temporal = _createdat.utcOffset(-5 * 60).format('DD/MM/YYYY HH:mm:ss');
              }
              //let _createdat = moment(curr.created)
              //curr.marca_temporal = _createdat.utc().format('DD/MM/YYYY HH:mm:ss');
              //curr.marca_temporal = _createdat.utc().format('DD/MM/YYYY');

              return [...acc, curr]
          }, [])
          return depositos
        })
    },
    depositos_upd: async(_, {last_id}) => {
      //return Deposito.find({'_id': {'$gt': last_id}}).limit(1)
      return Deposito.find()
        .then(async res => {
          const foundIndex = (elem) => elem.id === last_id;
          let curr_index = res.findIndex(foundIndex)
          if(curr_index < 0 ) throw new Error('ID not found')
          let resy = []
          for(let ix = curr_index + 1; ix < res.length; ix++ ) resy.push(res[ix])

          const users = await User.find()
          const pagos = await Pago.find()
          const depositos  = resy.reduce((acc, curr) => {
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

              if(pago){
                let _createdat = moment(pago.createdAt)
                curr.marca_temporal = _createdat.utcOffset(-5 * 60).format('DD/MM/YYYY HH:mm:ss');
              }
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
    boletas_upd: async(_, {last_id}) => {
      return Pago.find({ editable: false })
        .then(async res => {
          const pagoIds = res.map(r => r.id)
          const _boletas = await Boleta.find({ pagoId: { $in: pagoIds } })
          const boletaIds = res.map(b => b.userId)
          const _users = await User.find({ _id: { $in: boletaIds } })
          const _promociones = await Promocion.find()

          const foundIndex = (elem) => elem.id === last_id;
          let curr_index = _boletas.findIndex(foundIndex)
          if(curr_index < 0 ) throw new Error('ID not found')
          //if(curr_index + 1 === _boletas.length ) throw new Error('This is current latest element')
          let __boletas = []
          for(let ix = curr_index + 1; ix < _boletas.length; ix++ ) __boletas.push(_boletas[ix])

          //const boletas = _boletas.reduce((ac, p) => ([...ac,p]), [] )
          const boletas = __boletas.reduce((acc, curr) => {
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
        let _createdat;
        const leadslps = res.reduce((acc, curr) => {
          curr.id,
          _createdat = moment(curr.createdAt)
          curr.marca_temporal = _createdat.utcOffset(-5 * 60).format('DD/MM/YYYY HH:mm:ss')
          //curr.createdAt = moment(curr.createdAt).format('DD/MM/YYYY HH:mm:ss');
          curr.username
          curr.nombre = curr.profile.nombre
          curr.apellido = curr.profile.apellido
          curr.dni = curr.profile.dni
          curr.celular = curr.profile.celular
          curr.email = curr.emails[0].address
          curr.roles = curr.roles? curr.roles : null
          
          return [...acc, curr]
        },[])
        return leadslps
      })
    },
    pagos_reales: () => {
      return PagosReales.find()//.limit(10)
        .then(async res => {
          const pReales  = res.reduce((acc, curr, indx) => {
            let _comision = new Number(0)
            let _promocion = new Number(0)

            //if(pagos) curr.pagos.createdAt = curr.pagos.createdAt.toISOString()
            //if(depositos) curr.depositos.created = curr.depositos.created.toISOString()
            if(curr.boletas){
              curr.boletas.comision ?
              _comision = (curr.boletas.monto * new Number(curr.boletas.comision)) / 100 :
              _comision = (curr.boletas.monto * new Number(2)) / 100
            }
            let _descuento = _comision
            if(curr.users){
              const{_id,createdAt,username}  = curr.users
              const{nombre,apellido,dni,nacimiento,celular,referidorId,codigoUdsado,firstTime} = curr.users.profile
              let email = null
              if(curr.users.emails && !isEmptyArray(curr.users.emails)) email = curr.users.emails[0].address;
              curr.users = {_id,createdAt,username,nombre,apellido,dni,nacimiento,celular,email,referidorId,codigoUdsado,firstTime}
            }
            if(curr.promociones && !isEmptyObject(curr.promociones)){
              curr.promociones.tipo?
                _promocion = (curr.promociones.monto * new Number(curr.promociones.descuento)) / 100 :
                _promocion = new Number(curr.promociones.descuento);
                _descuento = _comision + _promocion;
            }
            curr.id =indx+1
            curr.descuento = _descuento
            curr.depositado  = curr.boletas.monto - _descuento
            curr.marca_temporal = moment(curr.pagos.createdAt).utcOffset(-5 * 60).format('DD/MM/YYYY HH:mm:ss');
            curr.comision_calc = _comision
            curr.promocion_calc = _promocion
            return [...acc, curr]
          }, [])
          return pReales
        })
    }
  }
};