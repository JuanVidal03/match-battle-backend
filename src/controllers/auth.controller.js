import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";

export const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const userFound = await UserModel.findOne({ email });
        if(!userFound) return res.status(404).json({ message: `El usuario ${email} no existe.` });
        
        const comparePassword = await bcrypt.compare(password, userFound.password);
        if(comparePassword === false) return res.status(400).json({ message: "Contraseña o email incorrectos." });

        const user = {
            id: userFound.id,
            nombreCompleto: userFound.nombreCompleto,
            email: userFound.email,
            telefono: userFound.telefono,
            estado: userFound.estado,
            cartas: userFound.cartas
        }

        jwt.sign(
            { id: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" },
            (error, token) => {
                error && res.status(400).json({ message: "Error al generar el token.", error });
                res.cookie("token", token, {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none"
                });
                return res.status(200).json({
                    message: "Ingreso correctamente.",
                    token: token,
                    data: user,
                });
            }
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al ingresar a la aplicacion",
            error: error.message
        });
    }

}

export const register = async(req, res) => {
    
    const { nombreCompleto, email, password, telefono, estado, cartas } = req.body;
    
    try {

        const foundUser = await UserModel.findOne({ email });
        if(foundUser) return res.status(400).json({ message: `El usuario con email: ${email} ya existe.` });

        const user = { nombreCompleto, email, password, telefono, estado, cartas };

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        
        const createdUser = await UserModel.create(user);

        const result = {
            nombreCompleto: createdUser.nombreCompleto,
            email: createdUser.email,
            telefono: createdUser.telefono,
            estado: createdUser.estado,
            cartas: createdUser.cartas
        };

        res.status(201).json({ message: "Usuario registrado exitosamente.", data: result });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al registrar el usuario.",
            error: error.message
        });
    }
}

export const veriFyToken = async(req, res) => {

    const { token } = req.cookies;

    try {

        if(!token) return res.status(403).json({ message: "Sin autorizacion." });

        jwt.verify(token, process.env.TOKEN_SECRET, async(error, user) => {
            if(error) return res.status(400).json({ message: error.message });

            const userFound = await UserModel.findById(user.id);
            if(!userFound) return res.status(404).json({ message: `Usuario con id: ${user.is} no existe.` });

            const userResult = {
                nombreCompleto: userFound.nombreCompleto,
                email: userFound.email,
                telefono: userFound.telefono,
                estado: userFound.estado,
                cartas: userFound.cartas
            }

            return res.status(200).json({
                message: "Token verificado exitosamente.",
                data: userResult
            });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al verificar el token.",
            error: error.message
        });
    }
}

export const logout = async(req, res) => {
    try {

        res.cookie("token", "", {
            expires: new Date(0)
        });
        
        res.status(200).json({ message: "Sesion cerrada exitosamente." });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al salir de la aplicacion.",
            error: error.message
        });
    }
}
