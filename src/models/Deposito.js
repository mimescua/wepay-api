import mongoose from "mongoose";
import { Pago } from "./Pago";

export const Deposito = mongoose.model('depositos_sheet', {
    _id: String,
    dni: String,
    nombres: String,
    apellidos: String,
    codigo_operacion: String,
    monto: String,
    fecha_transaccion: String,
    banco: String,
    id_pago: String,
    id_deposito: String,
    aprobar: String,
    pago: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'pagos'
        }
    ]
},'depositos_sheet'); //Added because a singular collection name