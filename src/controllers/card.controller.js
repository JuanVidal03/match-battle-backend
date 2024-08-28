import { CardModel } from "../models/card.model.js";


export const getAllCarts = async(req, res) => {
    try {
        
        const cards = await CardModel.find({});

        res.status(200).json({
            message: "Crads successfully obtained!",
            data: cards
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error getting all cards",
        });
    }
}

export const getCardById = async(req, res) => {

    const { id } = req.params

    try {

        const foundCard = await CardModel.findById(id);

        if(!foundCard) return res.status(404).json({
            message: `Card with id: ${id} has not found.`,
            data: []
        });

        res.status(200).json({
            message: `Card with id: ${id} has been found successfully!`,
            data: foundCard
        });
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: `Error getting card with id: ${id}.`,
        });
    }
}

export const createCards = async(req, res) => {

    const cards = req.body;

    try {

        const createdCards = await CardModel.insertMany(cards);

        res.status(201).json({
            message: "Cards created successfully!",
            data: createdCards,
        })
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Error creating card.",
        });
    }
}
