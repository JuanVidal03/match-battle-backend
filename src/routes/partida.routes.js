import { Router } from "express";
import { createPartida,updateDuration, getAllPartidas, getPartidaById } from "../controllers/partida.controller.js";

const partidaRouter = Router();

partidaRouter.post("/partida", createPartida);
partidaRouter.get("/partidas", getAllPartidas);
partidaRouter.get("/partida/:id", getPartidaById);
partidaRouter.patch("/partida/updatePartida/:id", updateDuration);

export default partidaRouter;
