import mongoose from "mongoose";

export const Lead = mongoose.model('leads', {
    _id: String,
    nombres: String,
    email: String,
    celular: String,
    monto: String,
    tarjeta: String,
    dni: String,
    tipo: String
});