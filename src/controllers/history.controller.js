import { HistoryModel } from "../models/history.model.js";

export const getAllHistories = async(req, res) => {
    try {
        
        const histories = await HistoryModel.find({});

        res.status(200).json({
            message: "Getting histories successfully!",
            data: histories,
        });

    } catch (error) {
        req.status(500).json({
            message: "",
            error: error.message,
        });
    }
}
