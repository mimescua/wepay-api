import mongoose from "mongoose";

export const Promocion = mongoose.model('promocionesahorradores', {
    _id: String,
    codigo: String,
    descuento: String,
    tipo: Boolean
});