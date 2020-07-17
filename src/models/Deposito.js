import mongoose from "mongoose";

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
},'depositos_sheet'); //Added because a singular collection name