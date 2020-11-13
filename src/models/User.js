import mongoose from "mongoose";

export const User = mongoose.model('users', {
    _id: String,
    createdAt: Date,
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
    emails: [{
        address: String
    }],
    roles: [
        String
    ],
    nombre: String,
    apellido: String,
    dni: String,
    nacimiento: String,
    celular: String,
    email: String,
    referidorId: String,
    codigoUdsado: String,
    firstTime: String
});