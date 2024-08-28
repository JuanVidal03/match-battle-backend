import mongoose from "mongoose";

const userSchema = await mongoose.Schema({

    nombreCompleto: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        trim: true,
        required: true
    },
    estado:{
        type: Boolean,
        required: false
    },
    cartas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "card"
    }]

});

export const UserModel = await mongoose.model("user", userSchema);
