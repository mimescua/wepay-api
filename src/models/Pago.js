import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pagoSchema = new Schema({
    _id: String,
    userId: String,
    createdAt: Date,
    editable: Boolean,
    promoId: String,
    estado: String,
    voucher: String,
    operacion: String
});

export const Pago = mongoose.model('pagos', pagoSchema );