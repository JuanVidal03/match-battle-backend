import mongoose from "mongoose";

const histoySchema = await mongoose.Schema({
    partida: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "partida",
    }],
});

export const HistoryModel = await mongoose.model("history", histoySchema);
