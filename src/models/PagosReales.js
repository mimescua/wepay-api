import { model, Schema } from "mongoose";

const PagosRealesSchema = new Schema(
    {
        id: String, // Index + Id de Pago
        comision: String,
        descuento: String,
        depositado: String,
        marca_temporal: String,
        comision_calc: String,
        promocion_calc: String,
        pagos: {
            _id: String,
            userId: String,
            createdAt: Date,
            editable: Boolean,
            promoId: String,
            estado: String,
            voucher: String,
            operacion: String
        },
        depositos: {
            _id: String,
            url: String,
            name: String,
            operacion: String,
            monto: String,
            fecha: String,
            banco: String,
            pagoId: String,
            userId: String,
            aprobado: Boolean,
            created: Date,
            pendiente: Boolean
        },
        boletas: {
            _id: String,
            pagoId: String,
            servicio: String,
            codigo: String,
            contrasenia: String,
            monto: String,
            vence: String,
            seleccionada: Boolean,
            estado: String,
            voucher_retirador: String,
            estadoRetirador: String,
            retiroId: String,
            createdAt: Date,
            
            comision: String,
        },
        users: {
            _id: String,
            createdAt: Date,
            username: String,
            profile: {
                nombre: String,
                apellido: String,
                dni: String,
                nacimiento: String,
                celular: String,
                referidorId: String,
                codigoUdsado: Boolean,
                firstTime: Boolean
            },
            emails: [{
                address: String,
                verified: Boolean
            }],
            roles: [
                String
            ],

            nombre: String,
            apellido: String,
            dni: String,
            nacimiento: String,
            celular: String,
            email: String,
            referidorId: String,
            codigoUdsado: Boolean,
            firstTime: Boolean
        },
        promociones: {
            _id: String,
            codigo: String,
            descuento: String,
            tipo: Boolean
        }
    },
    { versionKey: false, autoIndex: true }
);

function getUTCDateNoTime(date) {
    return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
}

PagosRealesSchema.pre("save", function (next) {
    this.pagos.createdAt = this.pagos.createdAt? getUTCDateNoTime(this.pagos.createdAt) : undefined;
    this.depositos.created = this.depositos.created? getUTCDateNoTime(this.depositos.created) : undefined;
    this.boletas.createdAt = this.boletas.createdAt? getUTCDateNoTime(this.boletas.createdAt) : undefined;
    this.users.createdAt = this.users.createdAt? getUTCDateNoTime(this.users.createdAt) : undefined;
    next();
});

export const PagosReales = model("vista_pagos", PagosRealesSchema);

//export const PagosReales = mongoose.model('vista_pagos', {
//    pagos: {
//        _id: String,
//        userId: String,
//        createdAt: Date,
//        editable: Boolean,
//        promoId: String,
//        estado: String,
//        voucher: String,
//        operacion: String
//    },
//    depositos: {
//        _id: String,
//        url: String,
//        name: String,
//        operacion: String,
//        monto: String,
//        fecha: String,
//        banco: String,
//        pagoId: String,
//        userId: String,
//        aprobado: Boolean,
//        created: {type: String, default: Date},
//        pendiente: Boolean,
//
//        marca_temporal: String
//    },
//    boletas:{
//        _id : String,
//        pagoId : String,
//        servicio : String,
//        codigo : String,
//        contrasenia : String,
//        monto : String,
//        vence : String,
//        seleccionada : Boolean,
//        estado : String,
//        voucher_retirador: String,
//        estadoRetirador : String,
//        retiroId : String,
//        createdAt: {type: String, default: Date},
//
//        comision: String,
//        descuento: String,
//        depositado: String,
//        marca_temporal: String,
//        comision_calc: String,
//        promocion_calc: String
//    },
//    users:{
//        _id: String,
//        createdAt: {type: String, default: Date},
//        username: String,
//        profile: {
//            nombre: String,
//            apellido: String,
//            dni: String,
//            nacimiento: String,
//            celular: String,
//            referidorId: String,
//            codigoUdsado: Boolean,
//            firstTime: Boolean
//        },
//        emails: [{
//            address: String,
//            verified: Boolean
//        }],
//        roles: [
//            String
//        ],
//
//        nombre: String,
//        apellido: String,
//        dni: String,
//        nacimiento: String,
//        celular: String,
//        email: String,
//        referidorId: String,
//        codigoUdsado: Boolean,
//        firstTime: Boolean
//    },
//    promociones:{
//        _id: String,
//        codigo: String,
//        descuento: String,
//        tipo: Boolean
//    }
//},'vista_pagos'); //Added because a singular collection name