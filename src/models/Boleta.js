import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Boleta = mongoose.model('boletas', {
    _id : String,
    pagoId : String,
    servicio : String,
    codigo : String,
    contrasenia : String,
    monto : String,
    vence : String,
    seleccionada : String,
    estado : String,
    estadoRetirador : String,
    retiroId : String,
    user: [{
        type: Schema.Types.ObjectId,
        ref:'users'
    }],
    pago: [{
        type: Schema.Types.ObjectId,
        ref:'pagos'
    }],
    promocion: [{
        type: Schema.Types.ObjectId,
        ref:''
    }],
    descuento: String,
    depositado: String,
});