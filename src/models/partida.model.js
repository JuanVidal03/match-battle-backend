import mongoose from "mongoose";

const partidaSchema = await mongoose.Schema({
    participantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    duracion: {
        minutos:{
            type: Number,
            required: true
        },
        segundos: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
});

export const PartidaModel = await mongoose.model("partida", partidaSchema);
