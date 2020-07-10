import mongoose from "mongoose";

export const Lead = mongoose.model('Leads', {
    _id: String,
    nombres: String,
    email: String,
    celular: String,
    monto: String,
    tarjeta: String,
    dni: String,
    tipo: String
});