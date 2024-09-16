import { PartidaModel } from "../models/partida.model.js";

export const getAllPartidas = async(req, res) => {
    try {
        
        const allPartidas = await PartidaModel.find({}).populate({
            path: "participantes",
            select: "-password"
        });

        res.status(200).json({
            message: "All partidas getting successfully!",
            data: allPartidas
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting al the partida.",
            error: error.message,
        });
    }
}

export const getPartidaById = async(req, res) => {
    
    const { id } = req.params;
    
    try {
        
        const foundPartida = await PartidaModel.findById(id).populate({
            path: "participantes",
            select: "-password",
            populate: {
                path: "cartas",
                model: "card"
            }
        });

        if(!foundPartida) return res.status(404).json({
            message: `Partida with id: ${id} has not been found.`,
            data: [],
        });

        res.status(200).json({
            message: `Partida with id: ${id} has been found successfully!`,
            data: foundPartida
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating the partida.",
            error: error.message,
        });
    }
}

export const createPartida = async(req, res) => {

    const { participantes, duracion, numParticipantes } = req.body;

    try {

        if(numParticipantes < 2 || numParticipantes > 7) return res.status(400).json({
            message: "You must complete de number of players.",
            data: []
        });


        if (participantes.length !== numParticipantes) return res.status(400).json({
            message: "The numbre of players and the players registered are different.",
            data: []
        });
        
        const createdPartida = await PartidaModel.create({ participantes, duracion, numParticipantes });

        res.status(201).json({
            message: "Partida created successfully!",
            data: createdPartida
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating the partida.",
            error: error.message,
        });
    }
}

export const updateDuration = async(req, res) => {

    const { id } = req.params;
    const { duration } = req.body;

    try {


        const updatedPartida = await PartidaModel.findByIdAndUpdate(id, { duration }, { new: true });
        console.log(updatedPartida);


        res.status(200).json({
            message: "Duration partida updated successfully!",
            data: updatedPartida
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error updating partida's duration.",
            error: error.message,
        });
    }
}
