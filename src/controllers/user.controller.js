import { UserModel } from "../models/user.model.js";


export const getAllUser = async(req, res) => {
    try {
        
        const users = await UserModel.find({});

        res.status(200).json({
            message: "Users successfully obtained!",
            data: users
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting all users.",
            error: error.message,
        });
    }
}

export const getUserById = async(req, res) => {

    const { id } = req.params;

    try {

        const userFound = await UserModel.findById(id);

        if(!userFound) return res.status(404).json({
            message: `The user with id: ${id} has not been found.`,
            data: []
        });

        res.status(200).json({
            message: `User with id: ${id} has been obtained successfully!`,
            data: userFound
        });

        
    } catch (error) {
        res.status(500).json({
            message: `Error getting user with id: ${id}.`,
            error: error.message,
        });
    }
}
