import mongoose from "mongoose";

const cardSchema = await mongoose.Schema({

    foto: {
        type: String,
        required: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    cilindraje: {
        type: Number,
        required: true,
    },
    cilindros: {
        type: Number,
        required: true
    },
    potencia:{
        type: Number,
        required: true
    },
    revoluciones: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },

});

export const CardModel = await mongoose.model("card", cardSchema);
