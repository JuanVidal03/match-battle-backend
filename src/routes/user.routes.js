import { Router } from "express";
import { getAllUser, getUserById, updateUserCards } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/users", getAllUser);
userRouter.get("/users/:id", getUserById);
userRouter.patch("/user/:id", updateUserCards);

export default userRouter;
