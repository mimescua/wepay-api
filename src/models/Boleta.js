import mongoose from "mongoose";

export const Boleta = mongoose.model('boletas_sheet', {
    _id: String,
    dni: String,
    nombres: String,
    apellidos: String,
    email: String,
    id_pago: String,
    id_boleta: String,
    marca_temporal: String,
    servicio: String,
    codigo: String,
    contrasenia: String,
    fecha_vencimiento: String,
    monto_de_pago_de_la_boleta: String,
    aprobar: String,
},'boletas_sheet'); //Added because a singular collection name