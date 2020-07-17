import mongoose from "mongoose";

export const Boleta = mongoose.model('boletas', {
    _id: String,
    pagoId: String,
    servicio: String,
    codigo: String,
    contrasenia: String,
    monto: String,
    vence: String,
    seleccionada: Boolean,
    estado: String
});