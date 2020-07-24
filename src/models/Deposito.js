import mongoose from "mongoose";
import { User } from "./User";

    
export const Deposito = mongoose.model('archivoscomprobantesahorrador', {
    _id: String,
    url: String,
    name: String,
    operacion: String,
    monto: String,
    fecha: String,
    banco: String,
    pagoId: String,
    userId: String,
    aprobado: String,
    created: Date,
    pendiente: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    marca_temporal: String
},'archivoscomprobantesahorrador'); //Added because a singular collection name