import mongoose from "mongoose";

export const Leadlp = mongoose.model('leadslp', {
    _id: String,
    nombres: String,
    email: String,
    celular: String,
    monto: String,
    tarjeta: String,
    origen: String,
    createdAt: String
},'leadslp');