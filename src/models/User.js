import mongoose from "mongoose";

export const User = mongoose.model('users', {
    _id: String,
    createdAt: String,
    username: String,
    profile: {
        nombre: String,
        apellido: String,
        dni: String,
        nacimiento: String,
        celular: String,
        referidorId: String,
        codigoUdsado: String,
        firstTime: String
    },
    nombre: String,
    apellido: String,
    dni: String,
    nacimiento: String,
    celular: String,
    referidorId: String,
    codigoUdsado: String,
    firstTime: String
});