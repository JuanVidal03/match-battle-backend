import { Router } from "express";
import { getAllCarts, getCardById, createCards } from "../controllers/card.controller.js";

const cardsRoutes = Router();

cardsRoutes.get("/cards", getAllCarts);
cardsRoutes.get("/cards/:id", getCardById);
cardsRoutes.post("/cards", createCards);

export default cardsRoutes;
